from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    country = models.CharField(max_length=20)

    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )

    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
<<<<<<< HEAD
=======

    token_code = models.CharField(max_length=80)
    token_expiration = models.DateTimeField()
    account_activated = models.BooleanField(default=False)
>>>>>>> 6e6faa3ee29ae24b120928661cb326408f10af4f
