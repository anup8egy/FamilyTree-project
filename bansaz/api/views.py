import json
from django.shortcuts import render, get_object_or_404
from django.utils.html import strip_tags
from django.utils.decorators import method_decorator
from django.utils.crypto import get_random_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views import View
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from datetime import datetime, timedelta, timezone

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserSerializer, ProfileDataSerializer, AccountSettingSerializer
from django.contrib.auth.models import User


class UserCreate(APIView):
    """ 
    Creates the user. 
    """

    throttle_scope = "register"

    @method_decorator(csrf_protect)
    def post(self, request, format="json"):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = RefreshToken.for_user(user)
                token["refresh_token_secret"] = user.profile.refresh_token_secret
                token["access_token_secret"] = user.profile.access_token_secret
                return Response(
                    json.dumps({"token": str(token.access_token)}),
                    status=status.HTTP_201_CREATED,
                    headers={
                        "Set-Cookie": "refresh={};max-age=1296000;httpOnly".format(
                            str(token)
                        )
                    },
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsernameLogin(APIView):
    """ Accepts Username or Email And Stores it in Session"""

    @method_decorator(csrf_protect)
    def post(self, request, format="json"):
        if request.user.is_authenticated:
            return Response(
                json.dumps({"Error": "Already Authenticated"}),
                status=status.HTTP_400_BAD_REQUEST,
            )
        if "username" in request.data:
            get_object_or_404(User, username=request.data["username"])
            request.session["username"] = request.data["username"]
        elif "email" in request.data:
            get_object_or_404(User, email=request.data["email"])
            request.session["email"] = request.data["email"]
        else:
            return Response(
                json.dumps({"Error": "Provide username/email "}),
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(json.dumps({"correct": True}), status=status.HTTP_200_OK)


class PasswordLogin(APIView):
    """Accepts Password for Username and Returns authentication token """

    @method_decorator(csrf_protect)
    def post(self, request, format="json"):
        if request.user.is_authenticated:
            return Response(
                json.dumps({"Error": "Already Authenticated"}),
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (not ("username" in request.session or "email" in request.session)) or (
            not "password" in request.data
        ):
            return Response(
                {"error": "Provide Username/Email and Password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            username = get_object_or_404(User, email=request.session["email"])
        except KeyError:
            username = request.session["username"]

        user = authenticate(username=username, password=request.data.get("password"))

        if not user:
            return Response(
                {"error": "Credentials Not Found"}, status=status.HTTP_404_NOT_FOUND
            )
        token = RefreshToken.for_user(user)

        token["refresh_token_secret"] = user.profile.refresh_token_secret
        token["access_token_secret"] = user.profile.access_token_secret
        return Response(
            json.dumps({"token": str(token.access_token)}),
            status=status.HTTP_200_OK,
            headers={
                "Set-Cookie": "refresh={};max-age=1296000;httpOnly".format(str(token))
            },
        )


class RefreshAuthToken(APIView):
    @method_decorator(csrf_protect)
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh")
            token = RefreshToken(refresh_token)
            user = User.objects.get(id=token["user_id"])

            token["refresh_token_secret"] = user.profile.refresh_token_secret
            token["access_token_secret"] = user.profile.access_token_secret

        except:
            return Response(
                json.dumps(
                    {
                        "details": "Error Occured. Refresh Token is unavailable/Invalid/Expired"
                    }
                ),
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            json.dumps({"token": str(token.access_token)}),
            status=status.HTTP_200_OK,
            headers={
                "Set-Cookie": "refresh={};max-age=1296000;httpOnly".format(str(token))
            },
        )


class RequestEmailVerification(APIView):
    throttle_scope = "forget_password"
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_protect)
    def post(self, request):
        if request.user:
            user = request.user
            # token = get_object_or_404(Token, key=request.data["token"])
            if user.profile.account_activated:
                return Response(
                    json.dumps({"error": "Already verified"}),
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.profile.activation_token_code = get_random_string(length=80)
            user.profile.activation_token_expiration = datetime.now(
                timezone.utc
            ) + timedelta(days=1)
            user.profile.save()
            html_message = render_to_string(
                "email.html",
                {
                    "user": user,
                    "domain": "localhost:8000",
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": user.profile.activation_token_code,
                    "information": "Please,confirm your email0000000 address to get started ",
                    "reason": "This is necessary in order to reset your password in case you forget it.",
                    "button": "Verify Now",
                    "link": "verify_email",
                },
            )
            send_mail(
                subject="Activate Email",
                html_message=html_message,
                from_email="The kul app",
                message=strip_tags(html_message),
                recipient_list=[user.email,],
                fail_silently=False,
            )
            return Response(
                json.dumps({"token code sent to your mail": True}),
                status=status.HTTP_200_OK,
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)


class RequestForgetPasswordVerification(APIView):
    throttle_scope = "forget_password"

    @method_decorator(csrf_protect)
    def post(self, request):
        if "email" in request.data:
            user = get_object_or_404(User, email=request.data["email"])
            user.profile.forget_password_token_code = get_random_string(length=80)
            user.profile.forget_password_token_expiration = datetime.now(
                timezone.utc
            ) + timedelta(days=1)
            user.profile.save()
            html_message = render_to_string(
                "email.html",
                {
                    "user": user,
                    "domain": "localhost:8000",
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": user.profile.forget_password_token_code,
                    "information": "Click on the link given below to continue",
                    "reason": "You can reset your password if you forgot.",
                    "button": "Change Password",
                    "link": "verify_forget_password",
                },
            )
            send_mail(
                subject="Password Reset",
                html_message=html_message,
                from_email="The Kul app",
                message=strip_tags(html_message),
                recipient_list=[request.data["email"]],
                fail_silently=False,
            )
            return Response(
                json.dumps({"Forget Password link sent to your mail": True}),
                status=status.HTTP_200_OK,
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutUser(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_exempt)
    def post(self, request):
        if not request.user:
            return Response(
                json.dumps(
                    {"details": "Send JWT Token as Authentication: Token <JWT_TOKEN>"}
                ),
                status=status.HTTP_401_UNAUTHORIZED,
            )
        request.user.profile.logout_user()

        return Response(json.dumps({"Info": "User Logged Out"}))


""" Registration Completed (Oauth and Captcha left )"""


class UserDashboardData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(json.dumps({"Test": True}))

    @method_decorator(csrf_exempt)
    def post(self, request):
        return Response(
            json.dumps({"User Data Provided": True, "name": request.user.username}),
            status=status.HTTP_200_OK,
        )


class UserProfileData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user:
            data = ProfileDataSerializer(request.user.profile).data
            return Response(json.dumps(data))
        return Response(
            json.dumps({"deatil": "Error Occured"}), status=status.HTTP_400_BAD_REQUEST
        )


class UserProfileDataChange(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]

    def post(self, request):
        if request.user:
            serializer = ProfileDataSerializer(request.user.profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(json.dumps({"Info": "User profile data updated"}))

            return Response(
                json.dumps(serializer.errors), status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            json.dumps({"details": "Error Occurred"}),
            status=status.HTTP_400_BAD_REQUEST,
        )


class AccountSettingsData(APIView):
    permission_classes = [IsAuthenticated]

    class AccountSettings:
        """Custom Object to make things work with serializer!! """

        def __init__(self, user):
            if not isinstance(user, User):
                raise TypeError("a User instance must be passed.")
            self.first_name = user.first_name
            self.last_name = user.last_name
            self.email = user.email
            self.get_mail_about_login = user.profile.get_mail_about_login
            self.profile_viewer = user.profile.profile_viewer
            self.searchable_group = user.profile.searchable_group

    @method_decorator(csrf_exempt)
    def post(self, request):
        if request.user:
            account_settings_object = self.AccountSettings(request.user)
            data = AccountSettingSerializer(account_settings_object).data
            return Response(json.dumps(data))
        return Response(
            json.dumps({"detail": "Error Occured"}), status=status.HTTP_400_BAD_REQUEST
        )


class AccountSettingsDataChange(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_exempt)
    def post(self, request):
        if request.user:
            # Verify Password if user tries to set New Password.
            if "new_password" in request.data:
                try:
                    user_password = request.data["password"]
                except Exception:
                    return Response(
                        json.dumps({"details": "No Password Field"}),
                        status=status.HTTP_403_FORBIDDEN,
                    )
                if request.user.check_password(user_password):
                    request.user.set_password(request.data["new_password"])
                else:
                    return Response(
                        json.dumps({"details": "Error Occured"}),
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            update = AccountSettingSerializer(request.user, data=request.data)
            if update.is_valid():
                # Verify Password if user tries to change the email.
                if "email" in request.data:
                    try:
                        user_password = request.data["password"]
                    except Exception:
                        return Response(
                            json.dumps({"details": "No Password Field"}),
                            status=status.HTTP_403_FORBIDDEN,
                        )
                    if request.user.check_password(user_password):
                        update.save()
                    else:
                        return Response(
                            json.dumps({"details": "Error Occured"}),
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                update.save()
                return Response(json.dumps({"Updated": True}))
        return Response(
            json.dumps({"detail": "Error Occured"}), status=status.HTTP_400_BAD_REQUEST
        )

