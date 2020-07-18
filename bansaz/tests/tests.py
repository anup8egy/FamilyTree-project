from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
import json
from api.models import Profile

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


class AccountsTest(APITestCase):
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
            user=self.test_user, country="Nepal", phone_number="+9222222222"
        )

        self.create_url = reverse("user_register")
        self.login_email_url = reverse("username_login")
        self.login_password_url = reverse("password_login")
        self.request_email_verification_url = reverse("request_email_verification")
        self.token_refresh_url = reverse("token_refresh")

    def check_tokens(self, response):
        """ Ensure Tokens are Well Set """

        self.assertTrue("token" in json.loads(response.data))
        refresh_token = response.__getitem__("set-cookie").split(";")[0].split("=")[1]
        refresh_token = RefreshToken(refresh_token)
        access_token = AccessToken(json.loads(response.data)["token"])
        # Ensure both Access and refresh Token Belongs to same user
        self.assertEqual(refresh_token["user_id"], access_token["user_id"])

    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            "first_name": "falano",
            "last_name": "Ko Xora",
            "username": "foobar",
            "email": "foobar@example.com",
            "password": "somepassword",
            "profile": {"country": "Nepal", "phone_number": "+9884858858",},
        }
        response = self.client.post(self.create_url, data, format="json")
        # We want to make sure we have two users in the database..
        self.assertEqual(User.objects.count(), 2)
        # And that we're returning a 201 created code.

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.check_tokens(response)

    def test_user_login(self):
        """ 
                Ensure we can login and proper token is returned
            """

        # Check User can Login With Email And PAssword
        data_email = {"email": "yubraj.bhadnari.hero@gmail.com"}
        data_pass = {"password": "testpassword"}

        response_pre = self.client.post(self.login_email_url, data_email, format="json")
        self.assertEqual(response_pre.status_code, status.HTTP_200_OK)

        response = self.client.post(self.login_password_url, data_pass, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.check_tokens(response)
        # Check User can Log in with username And Password
        new_data_username = {"username": "testuser"}
        new_data_password = {"password": "testpassword"}

        response = self.client.post(
            self.login_email_url, new_data_username, format="json"
        )
        response = self.client.post(
            self.login_password_url, new_data_password, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.check_tokens(response)

        # Wrong Username Doesnot Works
        wrong_username = {"username": "foobar1"}

        response = self.client.post(self.login_email_url, wrong_username, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse("token" in response.data)

        # Wrong Pasword
        wrong_password = {"password": "Wrong Apssword"}
        response = self.client.post(
            self.login_email_url, new_data_username, format="json"
        )
        response = self.client.post(
            self.login_password_url, wrong_password, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse("token" in response.data)

    def test_refresh_token(self):
        """ Ensure We can obtain Access Token using Valid Refresh Token"""
        data_username = {"username": "testuser"}
        data_password = {"password": "testpassword"}

        response = self.client.post(self.login_email_url, data_username, format="json")
        response = self.client.post(
            self.login_password_url, data_password, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obtained_access_token = json.loads(response.data)["token"]

        response = self.client.post(
            self.token_refresh_url,
            data={},
            format="json",
            headers={
                "Authorization": "Token " + obtained_access_token,
                # "Set-Cookie": "refresh={};max-age=1296000;httpOnly".format(str(token)),
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in json.loads(response.data))
