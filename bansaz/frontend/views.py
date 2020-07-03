from django.shortcuts import render, redirect, get_object_or_404
from django.views import View, generic
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.models import User
from datetime import datetime, timezone
from api.models import Profile

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class FrontEndView(generic.TemplateView):
    template_name = "index.html"


class EmailVerification(APIView):
    def get(self, request, uidb64, token_code):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except:
            return HttpResponse("Activation link is invalid!")

        if (
            user.profile.activation_token_code == token_code
            and user.profile.activation_token_expiration > datetime.now(timezone.utc)
        ):
            user.profile.account_activated = True
            user.profile.activation_token_code = ""
            user.profile.activation_token_expiration = datetime.now(timezone.utc)
            user.profile.save()
            return redirect("/login")
        return Response(
            "Activation link is invalid! or the link is stale",
            status=status.HTTP_400_BAD_REQUEST,
        )


class ForgetPasswordVerification(APIView):
    def get(self, request, uidb64, token_code):
        return render(
            request,
            template_name="forget-password.html",
            context={"uidb64": uidb64, "token": token_code},
        )

    def post(self, request, uidb64, token_code):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except:
            return Response("Error.")

        if (
            user.profile.forget_password_token_code == token_code
            and user.profile.forget_password_token_expiration
            > datetime.now(timezone.utc)
            and "password" in request.data
        ):
            user.set_password(request.data["password"])
            user.save()
            user.profile.forget_password_token_code = ""
            user.profile.forget_password_token_expiration = datetime.now(timezone.utc)
            user.profile.save()
            return redirect("/login")
        return Response("Error.", status=status.HTTP_400_BAD_REQUEST)
