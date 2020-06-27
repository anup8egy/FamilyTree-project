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

    activation_token_code = models.CharField(max_length=80, null=True, blank=True)
    activation_token_expiration = models.DateTimeField(null=True, blank=True)
    account_activated = models.BooleanField(default=False)

    forget_password_token_code = models.CharField(max_length=80, null=True, blank=True)
    forget_password_token_expiration = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "{}, activated:{} ".format(self.user, self.account_activated)

