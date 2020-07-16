from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path("auth", views.UsernameLogin.as_view(), name="username_login"),
    path("auth/password", views.PasswordLogin.as_view(), name="password_login"),
    path("auth/register", views.UserCreate.as_view(), name="user_register"),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path(
        "auth/request-email-verification",
        views.RequestEmailVerification.as_view(),
        name="request_email_verification",
    ),
    path(
        "auth/request-forget-password-verification",
        views.RequestForgetPasswordVerification.as_view(),
        name="request_forget_password_verification",
    ),
    path(
        "user-data/dashboard", views.UserDashboardData.as_view(), name="user-dashboard"
    ),
]
urlpatterns = format_suffix_patterns(urlpatterns)
