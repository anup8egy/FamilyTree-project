from django.urls import path, include, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path("", views.index),
    path("aa", views.new),
    path("auth", views.UserCreate.as_view(), name="accountCreate"),
]

