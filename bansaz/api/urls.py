from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from frontend.views import FrontEndView
from . import views

urlpatterns = [
    path("auth", views.UsernameLogin.as_view(), name="username_login"),
    path("auth/password", views.PasswordLogin.as_view(), name="password_login"),
    path("auth/register", views.UserCreate.as_view(), name="user_register"),
    path("auth/refresh", views.RefreshAuthToken.as_view(), name="token_refresh"),
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
    path("auth/logout", views.LogoutUser.as_view(), name="logout_user"),
    # path(
    #     "user-data/dashboard", views.UserDashboardData.as_view(), name="user_dashboard"
    # ),
    path(
        "user-data/profile", views.UserProfileData.as_view(), name="user_profile_view"
    ),
    path(
        "user-data/profile/edit",
        views.UserProfileDataChange.as_view(),
        name="user_profile_edit",
    ),
    path(
        "user-data/account_settings",
        views.AccountSettingsData.as_view(),
        name="account_setting_view",
    ),
    path(
        "user-data/account_settings/edit",
        views.AccountSettingsDataChange.as_view(),
        name="account_setting_edit",
    ),
    path("trees", views.AllTreesData.as_view(), name="trees_data",),
    path("trees/edit", views.CreateOrUpdateTrees.as_view(), name="trees_edit",),
    path("person", views.PersonView.as_view(), name="person_data"),
    path("relation", views.RelationsView.as_view(), name="relation_data"),
    path(
        "relation-calculator",
        views.RelationCalculatorView.as_view(),
        name="relation_calculator",
    ),
    path("clan-data", views.ClanPersonRelationView.as_view(), name="clan_data"),
]
urlpatterns += [
    re_path(r"(?P<path>.*)", FrontEndView.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
