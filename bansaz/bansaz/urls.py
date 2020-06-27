"""bansaz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from frontend import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path(
        "email-verification/<uidb64>/<token_code>",
        views.EmailVerification.as_view(),
        name="verify_email",
    ),
    path(
        "password-token-verification/<uidb64>/<token_code>",
        views.ForgetPasswordVerification.as_view(),
        name="verify_forget_password",
    ),
]
urlpatterns += [
    re_path(r"(?P<path>.*)", views.FrontEndView.as_view()),
]

