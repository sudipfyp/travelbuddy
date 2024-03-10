from django.db import models

# Create your models here.


class user(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    preferredplace = models.CharField(max_length=200)
    image = models.ImageField(upload_to=None, null=True)
    identifier = models.CharField(max_length = 50, default = "user")


class userProfile(models.Model):
    user = models.OneToOneField(user, on_delete=models.CASCADE)


class guide(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    tag = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to=None, null=True)
    identifier = models.CharField(max_length = 45, default = "guide")
    charge = models.IntegerField()


class seller(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    shop_name = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=200)
    shop_address = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to=None, null=True)
    identifier = models.CharField(max_length = 50, default = "seller")
