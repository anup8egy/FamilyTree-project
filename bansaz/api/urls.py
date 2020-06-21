from django.urls import path, include, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path("", views.index),
    path("aa", views.new),
    path("auth", views.UsernameLogin.as_view(), name="username_login"),
    path("auth/password", views.PasswordLogin.as_view(), name="password_login"),
]

