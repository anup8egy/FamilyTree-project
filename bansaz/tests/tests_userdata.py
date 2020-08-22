from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
import json
from api.models import Profile


class UserDataTest(APITestCase):
    def setUp(self):
        # We want to go ahead and originally create a user.
        self.test_user = User.objects.create_user(
            "testuser",
            "yubraj.bhadnari.hero@gmail.com",
            "testpassword",
            first_name="test",
            last_name="Person",
        )
        self.test_profile = Profile.objects.create(
            workplace="Nayamill",
            schools="['Kalika', 'Shanti']",
            colleges="['Kalika', 'Tilottama']",
            city="Butwal",
            user=self.test_user,
            country="Nepal",
            phone_number="+9222222222",
        )
        self.url_profile_view = reverse("user_profile_view")
        self.login_email_url = reverse("username_login")
        self.login_password_url = reverse("password_login")
        self.url_account_setting_view = reverse("account_setting_view")
        self.url_account_setting_edit = reverse("account_setting_edit")

    def get_access_token(self, email=None, password=None):
        if email == None:
            email = self.test_user.email
        if password == None:
            password = "testpassword"
        # print(email, password)
        response = self.client.post(
            self.login_email_url, {"email": email}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.post(
            self.login_password_url, {"password": password}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return json.loads(response.data)["token"]

    def test_profile_view(self):
        access_token = self.get_access_token()
        response = self.client.post(
            self.url_profile_view, {}, HTTP_AUTHORIZATION="Token " + access_token
        )
        # print(response.data)
        self.assertEqual(json.loads(response.data)["city"], self.test_profile.city)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_account_settings_view(self):
        """ Check IF Account Setings API Works Correctly"""
        access_token = self.get_access_token()
        response = self.client.post(
            self.url_account_setting_view,
            {},
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.data)["profile_viewer"], "Public")
        self.assertTrue("first_name" in json.loads(response.data))

    def test_account_settings_edit(self):
        """ Check IF Account Setings Edit Api Works Corrctly"""
        access_token = self.get_access_token()

        # Change First Name, Last Name
        req_data = {"first_name": "Taste", "last_name": "People"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.test_user.refresh_from_db()
        self.assertEqual(self.test_user.first_name, "Taste")
        # Try to Change Email Without Sending PAssword
        req_data = {"email": "handsome@go.com"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.test_user.refresh_from_db()
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.test_user.email, "yubraj.bhadnari.hero@gmail.com")

        # Change Email of the User
        req_data = {"email": "handsome@go.com", "password": "testpassword"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.test_user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.test_user.email, "handsome@go.com")

        # Try to Change New Password Without Sending PAssword
        req_data = {"new_password": "tastepassword"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.test_user.refresh_from_db()
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.test_user.check_password("testpassword"))

        # Try to Change New Password Sending Wrong PAssword
        req_data = {"new_password": "tastepassword", "password": "wronmgd"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.test_user.refresh_from_db()
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.test_user.check_password("testpassword"))

        # Change New Password
        req_data = {"new_password": "tastepassword", "password": "testpassword"}
        response = self.client.post(
            self.url_account_setting_edit,
            req_data,
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.test_user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.test_user.check_password("tastepassword"))

