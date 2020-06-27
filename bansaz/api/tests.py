from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
import json
from .models import Profile


class AccountsTest(APITestCase):
    def setUp(self):
        # We want to go ahead and originally create a user.
        self.test_user = User.objects.create_user(
            "testuser", "yubraj.bhadnari.hero@gmail.com", "testpassword"
        )
        self.test_profile = Profile.objects.create(
            user=self.test_user, country="Nepal", phone_number="+9222222222"
        )

        self.create_url = reverse("user_register")
        self.login_email_url = reverse("username_login")
        self.login_password_url = reverse("password_login")
        self.request_email_verification_url = reverse("request_email_verification")

    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            "username": "foobar",
            "email": "foobar@example.com",
            "password": "somepassword",
            "profile": {"country": "Nepal", "phone_number": "+9884858858",},
        }

        response = self.client.post(self.create_url, data, format="json")

        self.assertEqual(
            json.loads(response.data)["token"],
            Token.objects.get(user=User.objects.get(username="foobar")).key,
        )
        # We want to make sure we have two users in the database..
        self.assertEqual(User.objects.count(), 2)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        """ 
                Ensure we can login and proper token is returned
            """
        data_email = {"email": "yubraj.bhadnari.hero@gmail.com"}
        data_pass = {"password": "testpassword"}

        response_pre = self.client.post(self.login_email_url, data_email, format="json")
        self.assertEqual(response_pre.status_code, status.HTTP_200_OK)

        response = self.client.post(self.login_password_url, data_pass, format="json")

        self.assertEqual(
            json.loads(response.data)["token"],
            Token.objects.get(user=User.objects.get(username="testuser")).key,
        )

    def test_request_email_verification(self):
        """ 
         Check If Email Verification link is sent  
          """
        user = User.objects.get(email="yubraj.bhadnari.hero@gmail.com")
        token, c = Token.objects.get_or_create(user=user)
        data = {"token": token.key}
        print(data)
        response = self.client.post(
            self.request_email_verification_url, data, format="json"
        )
        print("\n\nResponse\n\n", response)

        self.assertTrue("token_code" in json.loads(response.data))
        self.assertEqual(
            json.loads(response.data)["token_code"],
            Profile.objects.get(user=user).activation_token_code,
        )
