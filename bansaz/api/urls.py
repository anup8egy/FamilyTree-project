from django.urls import path, include, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path("/", views.index),
    path("", views.index),
    path("/aa", views.new),
    url(r"api/users^$", views.UserCreate.as_view(), name="account-create"),
]

