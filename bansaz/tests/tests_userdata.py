from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
import json
from api.models import Profile, Clan, Staffmap


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
        self.test_clan = Clan.objects.create(
            name="Test Clan",
            owner=self.test_user,
            description="Short Text lorem ipsum set dolor amet.",
        )
        self.test_staffmap = Staffmap.objects.create(
            name="Test Staffmap",
            owner=self.test_user,
            description="Short Text lorem ipsum set dolor amet.",
        )
        self.url_profile_view = reverse("user_profile_view")
        self.login_email_url = reverse("username_login")
        self.login_password_url = reverse("password_login")
        self.url_account_setting_view = reverse("account_setting_view")
        self.url_account_setting_edit = reverse("account_setting_edit")
        self.url_trees_data = reverse("trees_data")
        self.url_trees_edit = reverse("trees_edit")

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

    def test_trees_data(self):
        """ Check IF Trees List API Works Correctly"""
        access_token = self.get_access_token()
        response = self.client.post(
            self.url_trees_data, {}, HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(json.loads(response.data)) == 2)
        self.assertEqual(json.loads(response.data)[0]["tree_type"], "Family_clan")
        self.assertEqual(json.loads(response.data)[0]["name"], "Test Clan")

    def test_trees_create_new(self):
        """ Check IF New3 Trees Create API  Works Correctly"""
        access_token = self.get_access_token()
        # Try creating New Clan
        response = self.client.post(
            self.url_trees_edit,
            {
                "tree_type": "family_clan",
                "name": "new family clan",
                "description": "Some minor description",
            },
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)["name"], "new family clan")
        response = self.client.post(
            self.url_trees_data, {}, HTTP_AUTHORIZATION="Token " + access_token,
        )
        # Check if the new created is also returned
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(json.loads(response.data)) == 3)
        # Try creating new staff map
        response = self.client.post(
            self.url_trees_edit,
            {
                "tree_type": "staffmap",
                "name": "new staffmap",
                "description": "Some minor description",
            },
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)["name"], "new staffmap")
        response = self.client.post(
            self.url_trees_data, {}, HTTP_AUTHORIZATION="Token " + access_token,
        )
        # Check if the new created is also returned
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(json.loads(response.data)) == 4)
        # check tree_type field returns only family clans or staff map
        response = self.client.post(
            self.url_trees_data,
            {"tree_type": "staffmap"},
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(json.loads(response.data)) == 2)
        self.assertFalse(
            "family_clan" in [i["tree_type"] for i in json.loads(response.data)]
        )
        # Check if only single item is returned when id is given
        response = self.client.post(
            self.url_trees_data,
            {"tree_type": "staffmap", "id": 1},
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data)["name"], self.test_staffmap.name)

        """
            Check IF Trees Edit API  Works Correctly
        """
        # Try editing New Clan
        response = self.client.post(
            self.url_trees_data, {}, HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            "new family clan" in [i["name"] for i in json.loads(response.data)]
        )
        response = self.client.patch(
            self.url_trees_edit,
            {
                "tree_type": "family_clan",
                "id": 2,
                "name": "new edited clan",
                "description": "Some minor description Changed",
            },
            HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual("new edited clan", json.loads(response.data)["name"])
        self.assertNotEqual("new family clan", json.loads(response.data)["name"])
        # Check patch method doesnot creates new
        response = self.client.post(
            self.url_trees_data, {}, HTTP_AUTHORIZATION="Token " + access_token,
        )
        self.assertEqual(response.status_code, 200)
        self.assertFalse(
            "new family clan" in [i["name"] for i in json.loads(response.data)]
        )
        self.assertTrue(
            "new edited clan" in [i["name"] for i in json.loads(response.data)]
        )
