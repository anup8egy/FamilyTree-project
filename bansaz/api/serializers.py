from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("country", "phone_number")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "profile",
            "first_name",
            "last_name",
        )

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())], min_length=6
    )
    password = serializers.CharField(min_length=8)

    profile = ProfileSerializer()

    def validate_username(self, value):
        if " " in value:
            return serializers.ValidationError("username shouldnot contain <space>")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        Profile.objects.create(user=user, **profile_data)
        return user

