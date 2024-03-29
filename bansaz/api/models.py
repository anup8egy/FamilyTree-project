from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError

# Create your models here.
class MyArrayField(models.CharField):
    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        if isinstance(value, str):
            return value.strip("[]").replace('"', "").replace("'", "").split(",")
        return None

    def to_python(self, value):
        if isinstance(value, str):
            return value

        if value is None:
            return value

        return str(value)


def validate_image(image):
    # print("\n\n\n", dir(image), "\n\n\n")
    file_size = image.size
    # limit_kb = 150
    # if file_size > limit_kb * 1024:
    # raise ValidationError("Max size of file is %s KB" % limit)

    limit_mb = 5
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError("Max size of file is %s MB" % limit_mb)


# def get_country_tuple():
#     f = json.loads(open("./countryList.json", "rt").read())["list"]
#     return [(i["code"], i["label"]) for i in f]


class Profile(models.Model):
    COUNTRY_CHOICES = [
        ("Andorra", "Andorra"),
        ("United Arab Emirates", "United Arab Emirates"),
        ("Afghanistan", "Afghanistan"),
        ("Antigua and Barbuda", "Antigua and Barbuda"),
        ("Anguilla", "Anguilla"),
        ("Albania", "Albania"),
        ("Armenia", "Armenia"),
        ("Angola", "Angola"),
        ("Antarctica", "Antarctica"),
        ("Argentina", "Argentina"),
        ("American Samoa", "American Samoa"),
        ("Austria", "Austria"),
        ("Australia", "Australia"),
        ("Aruba", "Aruba"),
        ("Alland Islands", "Alland Islands"),
        ("Azerbaijan", "Azerbaijan"),
        ("Bosnia and Herzegovina", "Bosnia and Herzegovina"),
        ("Barbados", "Barbados"),
        ("Bangladesh", "Bangladesh"),
        ("Belgium", "Belgium"),
        ("Burkina Faso", "Burkina Faso"),
        ("Bulgaria", "Bulgaria"),
        ("Bahrain", "Bahrain"),
        ("Burundi", "Burundi"),
        ("Benin", "Benin"),
        ("Saint Barthelemy", "Saint Barthelemy"),
        ("Bermuda", "Bermuda"),
        ("Brunei Darussalam", "Brunei Darussalam"),
        ("Bolivia", "Bolivia"),
        ("Brazil", "Brazil"),
        ("Bahamas", "Bahamas"),
        ("Bhutan", "Bhutan"),
        ("Bouvet Island", "Bouvet Island"),
        ("Botswana", "Botswana"),
        ("Belarus", "Belarus"),
        ("Belize", "Belize"),
        ("Canada", "Canada"),
        ("Cocos (Keeling) Islands", "Cocos (Keeling) Islands"),
        ("Congo, Democratic Republic of the", "Congo, Democratic Republic of the"),
        ("Central African Republic", "Central African Republic"),
        ("Congo, Republic of the", "Congo, Republic of the"),
        ("Switzerland", "Switzerland"),
        ("Cote d'Ivoire", "Cote d'Ivoire"),
        ("Cook Islands", "Cook Islands"),
        ("Chile", "Chile"),
        ("Cameroon", "Cameroon"),
        ("China", "China"),
        ("Colombia", "Colombia"),
        ("Costa Rica", "Costa Rica"),
        ("Cuba", "Cuba"),
        ("Cape Verde", "Cape Verde"),
        ("Curacao", "Curacao"),
        ("Christmas Island", "Christmas Island"),
        ("Cyprus", "Cyprus"),
        ("Czech Republic", "Czech Republic"),
        ("Germany", "Germany"),
        ("Djibouti", "Djibouti"),
        ("Denmark", "Denmark"),
        ("Dominica", "Dominica"),
        ("Dominican Republic", "Dominican Republic"),
        ("Algeria", "Algeria"),
        ("Ecuador", "Ecuador"),
        ("Estonia", "Estonia"),
        ("Egypt", "Egypt"),
        ("Western Sahara", "Western Sahara"),
        ("Eritrea", "Eritrea"),
        ("Spain", "Spain"),
        ("Ethiopia", "Ethiopia"),
        ("Finland", "Finland"),
        ("Fiji", "Fiji"),
        ("Falkland Islands (Malvinas)", "Falkland Islands (Malvinas)"),
        ("Micronesia, Federated States of", "Micronesia, Federated States of"),
        ("Faroe Islands", "Faroe Islands"),
        ("France", "France"),
        ("Gabon", "Gabon"),
        ("United Kingdom", "United Kingdom"),
        ("Grenada", "Grenada"),
        ("Georgia", "Georgia"),
        ("French Guiana", "French Guiana"),
        ("Guernsey", "Guernsey"),
        ("Ghana", "Ghana"),
        ("Gibraltar", "Gibraltar"),
        ("Greenland", "Greenland"),
        ("Gambia", "Gambia"),
        ("Guinea", "Guinea"),
        ("Guadeloupe", "Guadeloupe"),
        ("Equatorial Guinea", "Equatorial Guinea"),
        ("Greece", "Greece"),
        (
            "South Georgia and the South Sandwich Islands",
            "South Georgia and the South Sandwich Islands",
        ),
        ("Guatemala", "Guatemala"),
        ("Guam", "Guam"),
        ("Guinea-Bissau", "Guinea-Bissau"),
        ("Guyana", "Guyana"),
        ("Hong Kong", "Hong Kong"),
        ("Heard Island and McDonald Islands", "Heard Island and McDonald Islands"),
        ("Honduras", "Honduras"),
        ("Croatia", "Croatia"),
        ("Haiti", "Haiti"),
        ("Hungary", "Hungary"),
        ("Indonesia", "Indonesia"),
        ("Ireland", "Ireland"),
        ("Israel", "Israel"),
        ("Isle of Man", "Isle of Man"),
        ("India", "India"),
        ("British Indian Ocean Territory", "British Indian Ocean Territory"),
        ("Iraq", "Iraq"),
        ("Iran, Islamic Republic of", "Iran, Islamic Republic of"),
        ("Iceland", "Iceland"),
        ("Italy", "Italy"),
        ("Jersey", "Jersey"),
        ("Jamaica", "Jamaica"),
        ("Jordan", "Jordan"),
        ("Japan", "Japan"),
        ("Kenya", "Kenya"),
        ("Kyrgyzstan", "Kyrgyzstan"),
        ("Cambodia", "Cambodia"),
        ("Kiribati", "Kiribati"),
        ("Comoros", "Comoros"),
        ("Saint Kitts and Nevis", "Saint Kitts and Nevis"),
        (
            "Korea, Democratic People's Republic of",
            "Korea, Democratic People's Republic of",
        ),
        ("Korea, Republic of", "Korea, Republic of"),
        ("Kuwait", "Kuwait"),
        ("Cayman Islands", "Cayman Islands"),
        ("Kazakhstan", "Kazakhstan"),
        ("Lao People's Democratic Republic", "Lao People's Democratic Republic"),
        ("Lebanon", "Lebanon"),
        ("Saint Lucia", "Saint Lucia"),
        ("Liechtenstein", "Liechtenstein"),
        ("Sri Lanka", "Sri Lanka"),
        ("Liberia", "Liberia"),
        ("Lesotho", "Lesotho"),
        ("Lithuania", "Lithuania"),
        ("Luxembourg", "Luxembourg"),
        ("Latvia", "Latvia"),
        ("Libya", "Libya"),
        ("Morocco", "Morocco"),
        ("Monaco", "Monaco"),
        ("Moldova, Republic of", "Moldova, Republic of"),
        ("Montenegro", "Montenegro"),
        ("Saint Martin (French part)", "Saint Martin (French part)"),
        ("Madagascar", "Madagascar"),
        ("Marshall Islands", "Marshall Islands"),
        (
            "Macedonia, the Former Yugoslav Republic of",
            "Macedonia, the Former Yugoslav Republic of",
        ),
        ("Mali", "Mali"),
        ("Myanmar", "Myanmar"),
        ("Mongolia", "Mongolia"),
        ("Macao", "Macao"),
        ("Northern Mariana Islands", "Northern Mariana Islands"),
        ("Martinique", "Martinique"),
        ("Mauritania", "Mauritania"),
        ("Montserrat", "Montserrat"),
        ("Malta", "Malta"),
        ("Mauritius", "Mauritius"),
        ("Maldives", "Maldives"),
        ("Malawi", "Malawi"),
        ("Mexico", "Mexico"),
        ("Malaysia", "Malaysia"),
        ("Mozambique", "Mozambique"),
        ("Namibia", "Namibia"),
        ("New Caledonia", "New Caledonia"),
        ("Niger", "Niger"),
        ("Norfolk Island", "Norfolk Island"),
        ("Nigeria", "Nigeria"),
        ("Nicaragua", "Nicaragua"),
        ("Netherlands", "Netherlands"),
        ("Norway", "Norway"),
        ("Nepal", "Nepal"),
        ("Nauru", "Nauru"),
        ("Niue", "Niue"),
        ("New Zealand", "New Zealand"),
        ("Oman", "Oman"),
        ("Panama", "Panama"),
        ("Peru", "Peru"),
        ("French Polynesia", "French Polynesia"),
        ("Papua New Guinea", "Papua New Guinea"),
        ("Philippines", "Philippines"),
        ("Pakistan", "Pakistan"),
        ("Poland", "Poland"),
        ("Saint Pierre and Miquelon", "Saint Pierre and Miquelon"),
        ("Pitcairn", "Pitcairn"),
        ("Puerto Rico", "Puerto Rico"),
        ("Palestine, State of", "Palestine, State of"),
        ("Portugal", "Portugal"),
        ("Palau", "Palau"),
        ("Paraguay", "Paraguay"),
        ("Qatar", "Qatar"),
        ("Reunion", "Reunion"),
        ("Romania", "Romania"),
        ("Serbia", "Serbia"),
        ("Russian Federation", "Russian Federation"),
        ("Rwanda", "Rwanda"),
        ("Saudi Arabia", "Saudi Arabia"),
        ("Solomon Islands", "Solomon Islands"),
        ("Seychelles", "Seychelles"),
        ("Sudan", "Sudan"),
        ("Sweden", "Sweden"),
        ("Singapore", "Singapore"),
        ("Saint Helena", "Saint Helena"),
        ("Slovenia", "Slovenia"),
        ("Svalbard and Jan Mayen", "Svalbard and Jan Mayen"),
        ("Slovakia", "Slovakia"),
        ("Sierra Leone", "Sierra Leone"),
        ("San Marino", "San Marino"),
        ("Senegal", "Senegal"),
        ("Somalia", "Somalia"),
        ("Suriname", "Suriname"),
        ("South Sudan", "South Sudan"),
        ("Sao Tome and Principe", "Sao Tome and Principe"),
        ("El Salvador", "El Salvador"),
        ("Sint Maarten (Dutch part)", "Sint Maarten (Dutch part)"),
        ("Syrian Arab Republic", "Syrian Arab Republic"),
        ("Swaziland", "Swaziland"),
        ("Turks and Caicos Islands", "Turks and Caicos Islands"),
        ("Chad", "Chad"),
        ("French Southern Territories", "French Southern Territories"),
        ("Togo", "Togo"),
        ("Thailand", "Thailand"),
        ("Tajikistan", "Tajikistan"),
        ("Tokelau", "Tokelau"),
        ("Timor-Leste", "Timor-Leste"),
        ("Turkmenistan", "Turkmenistan"),
        ("Tunisia", "Tunisia"),
        ("Tonga", "Tonga"),
        ("Turkey", "Turkey"),
        ("Trinidad and Tobago", "Trinidad and Tobago"),
        ("Tuvalu", "Tuvalu"),
        ("Taiwan, Province of China", "Taiwan, Province of China"),
        ("United Republic of Tanzania", "United Republic of Tanzania"),
        ("Ukraine", "Ukraine"),
        ("Uganda", "Uganda"),
        ("United States", "United States"),
        ("Uruguay", "Uruguay"),
        ("Uzbekistan", "Uzbekistan"),
        ("Holy See (Vatican City State)", "Holy See (Vatican City State)"),
        ("Saint Vincent and the Grenadines", "Saint Vincent and the Grenadines"),
        ("Venezuela", "Venezuela"),
        ("British Virgin Islands", "British Virgin Islands"),
        ("US Virgin Islands", "US Virgin Islands"),
        ("Vietnam", "Vietnam"),
        ("Vanuatu", "Vanuatu"),
        ("Wallis and Futuna", "Wallis and Futuna"),
        ("Samoa", "Samoa"),
        ("Kosovo", "Kosovo"),
        ("Yemen", "Yemen"),
        ("Mayotte", "Mayotte"),
        ("South Africa", "South Africa"),
        ("Zambia", "Zambia"),
        ("Zimbabwe", "Zimbabwe"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    country = models.CharField(max_length=100, choices=COUNTRY_CHOICES, default="NP")
    access_token_secret = models.CharField(max_length=50, default=get_random_string(40))
    refresh_token_secret = models.CharField(
        max_length=50, default=get_random_string(40)
    )

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

    # PROFILE INFORMATIONS
    # -----------------------------
    picture = models.ImageField(
        "Image", upload_to="images/", blank=True, null=True, validators=[validate_image]
    )
    workplace = models.CharField(max_length=70, blank=True, null=True)
    schools = MyArrayField(max_length=300, blank=True, null=True)
    colleges = MyArrayField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    relationship_status = models.CharField(max_length=20, blank=True, null=True)
    degrees = MyArrayField(max_length=100, blank=True, null=True)
    education_status = models.CharField(max_length=30, blank=True, null=True)
    phone_numbers = MyArrayField(max_length=50, blank=True, null=True)
    emails = MyArrayField(max_length=50, blank=True, null=True)
    GENDER_CHOICES = [("Male", "Male"), ("Female", "Female"), ("Other", "Other")]
    gender = models.CharField(
        max_length=8, choices=GENDER_CHOICES, blank=True, null=True
    )

    # Acount Settings INFORMATION
    # -----------------------------
    VIEWER_GROUP = [
        ("Only Me", "Only Me"),
        ("Related", "Related"),
        ("Public", "Public"),
    ]
    get_mail_about_login = models.BooleanField(default=False)
    searchable_group = models.CharField(
        max_length=10, choices=VIEWER_GROUP, default="Public"
    )
    profile_viewer = models.CharField(
        max_length=10, choices=VIEWER_GROUP, default="Public"
    )
    # is_deleted = models.BooleanField(default=False) Used user.is_active

    def __str__(self):
        return "{}, activated:{} ".format(self.user, self.account_activated)

    def logout_user(self):
        self.access_token_secret = get_random_string(40)
        self.save()

    def invalidate_refresh(self):
        self.refresh_token_secret = get_random_string(40)
        self.save()


class Clan(models.Model):
    name = models.CharField(max_length=30, unique=True)
    date_created = models.DateField(auto_now=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owner_clans"
    )
    admins = models.ManyToManyField(User, related_name="admin_clans", blank=True)
    description = models.TextField()
    VIEWER_GROUP = [
        ("Admins", "Admins"),
        ("Selected", "Selected"),
        ("Public", "Public"),
    ]
    viewers = models.CharField(max_length=10, choices=VIEWER_GROUP, default="Public")
    viewable_to = models.ManyToManyField(User, related_name="viewable_to", blank=True,)

    def __str__(self):
        return self.name

    @property
    def tree_type(self):
        return "Family_clan"


class Staffmap(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owner_staffmaps"
    )
    date_created = models.DateField(auto_now=True)
    admins = models.ManyToManyField(User, related_name="admin_staffmaps", blank=True)
    description = models.TextField()
    VIEWER_GROUP = [
        ("Admins", "Admins"),
        ("Selected", "Selected"),
        ("Public", "Public"),
    ]
    viewers = models.CharField(max_length=10, choices=VIEWER_GROUP, default="Public")
    viewable_to = models.ManyToManyField(User, related_name="viewble_to", blank=True,)

    def __str__(self):
        return self.name

    @property
    def tree_type(self):
        return "Staffmap"


class Person(models.Model):
    name = models.CharField(max_length=30)
    GENDER_CHOICES = [("Male", "Male"), ("Female", "Female"), ("Other", "Other")]
    gender = models.CharField(
        max_length=8, choices=GENDER_CHOICES, blank=True, null=True
    )

    def __str__(self):
        return self.name


class Relation(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class ClanPersonRelation(models.Model):
    first_person = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name="first_persons"
    )
    second_person = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name="second_persons"
    )
    clan = models.ForeignKey(Clan, on_delete=models.CASCADE, related_name="relations")
    relation = models.ForeignKey(
        Relation, on_delete=models.CASCADE, related_name="clanpersons"
    )

    def __str__(self):
        return "{} is {} of {} in {} ".format(
            self.second_person, self.relation, self.first_person, self.clan,
        )


class RelationCalc(models.Model):
    first_relation = models.ForeignKey(
        Relation, on_delete=models.CASCADE, related_name="first_relationcalc"
    )
    second_relation = models.ForeignKey(
        Relation, on_delete=models.CASCADE, related_name="second_relationcalc"
    )
    result_relation = models.ForeignKey(
        Relation, on_delete=models.CASCADE, related_name="result_relationcalc"
    )

    def __str__(self):
        return "{}'s {} is {}".format(
            self.first_relation, self.second_relation, self.result_relation
        )

    class Meta:
        unique_together = ("first_relation", "second_relation")

