# Generated by Django 3.0.8 on 2020-07-22 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20200629_2139'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='token_secret',
            field=models.CharField(default='7VcBZeecJJO0vUAE6ihGYMtYWlKaD4m11YW5ZRho', max_length=50),
        ),
    ]
