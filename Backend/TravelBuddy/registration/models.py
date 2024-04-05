from django.db import models

# Create your models here.
class admin(models.Model):
    name = models.CharField( max_length=200)
    email = models.EmailField( max_length=200, unique = True)
    password = models.CharField(max_length = 200)

class user(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    preferredplace = models.CharField(max_length=200)
    image = models.ImageField(upload_to="user", null=True)
    identifier = models.CharField(max_length = 50, default = "user")


class guide(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    tag = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to="guide", null=True)
    identifier = models.CharField(max_length = 45, default = "guide")
    charge = models.IntegerField(null = True)


class seller(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to="seller", null=True)
    identifier = models.CharField(max_length = 50, default = "seller")


