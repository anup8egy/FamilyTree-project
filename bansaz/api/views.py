import json
from django.shortcuts import render, get_object_or_404
from django.views import View
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer
from django.contrib.auth.models import User


class UserCreate(APIView):
    """ 
    Creates the user. 
    """

    @method_decorator(csrf_exempt)
    def post(self, request, format="json"):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
<<<<<<< HEAD
                json = dict()
                json["token"] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
=======
                return Response(
                    json.dumps({"token": token.key}), status=status.HTTP_201_CREATED
                )
>>>>>>> 6e6faa3ee29ae24b120928661cb326408f10af4f
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsernameLogin(APIView):
    @method_decorator(csrf_protect)
    def post(self, request, format="json"):
        print(request.data)
        if "username" in request.data:
            get_object_or_404(User, username=request.data["username"])
            request.session["username"] = request.data["username"]
        elif "email" in request.data:
            get_object_or_404(User, email=request.data["email"])
            request.session["email"] = request.data["email"]
        else:
            return Response(
                {"error": "Provide username/email "}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(status=status.HTTP_200_OK)


def index(req):
    return HttpResponse("<h1> Hello World from Django</h1>")


def new(req):
    return HttpResponse("ok works")


class PasswordLogin(APIView):
    @method_decorator(csrf_protect)
    def post(self, request, format="json"):
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
        token, created = Token.objects.get_or_create(user=user)

        return Response({"token": token.key}, status=status.HTTP_200_OK)
