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

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserSerializer
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
            print("\n\n\nWorking")
            # expired_auth_header = JWTAuthentication.get_header(request=request)
            # print("Working")
            # expired_auth_Token = AccessToken(
            #     token=JWTAuthentication.get_raw_token(header=expired_auth_header),
            #     verify=False,
            # )
            # print("Working")
            # if not token["user_id"] == expired_auth_Token["user_id"]:
            #     return Response(
            #         json.dumps(
            #             {
            #                 "details": "Refresh Token is unavailable/Invalid/Expired or User_id Mismatched"
            #             }
            #         ),
            #         status=status.HTTP_400_BAD_REQUEST,
            #     )

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

    @method_decorator(csrf_protect)
    def post(self, request):
        if "token" in request.data:
            token = get_object_or_404(Token, key=request.data["token"])
            if token.user.profile.account_activated:
                return Response(
                    json.dumps({"error": "Already verified"}),
                    status=status.HTTP_400_BAD_REQUEST,
                )
            token.user.profile.activation_token_code = get_random_string(length=80)
            token.user.profile.activation_token_expiration = datetime.now(
                timezone.utc
            ) + timedelta(days=1)
            token.user.profile.save()
            html_message = render_to_string(
                "email.html",
                {
                    "user": token.user,
                    "domain": "localhost:8000",
                    "uid": urlsafe_base64_encode(force_bytes(token.user.pk)),
                    "token": token.user.profile.activation_token_code,
                    "information": "Please,confirm your email address to get started ",
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
                recipient_list=[token.user.email,],
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


""" Registration Completed (Oauth and Captcha left )"""


class UserDashboardData(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_exempt)
    def post(self, request):
        return Response(
            json.dumps({"User Data Provided": True, "name": request.user.username}),
            status=status.HTTP_200_OK,
        )

