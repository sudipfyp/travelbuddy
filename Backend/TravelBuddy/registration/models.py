from django.db import models

# Create your models here.


class admin(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)


class user(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    address = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    preferredplace = models.CharField(max_length=200)
    image = models.ImageField(upload_to="user", null=True)
    identifier = models.CharField(max_length=50, default="user")
    verify = models.BooleanField(default=False)


class guide(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    description = models.TextField(null=True)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    tag = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to="guide", null=True)
    identifier = models.CharField(max_length=45, default="guide")
    charge = models.IntegerField(null=True)
    rating = models.FloatField(null=True)
    verify = models.BooleanField(default=False)


class seller(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=200)
    image = models.ImageField(upload_to="seller", null=True)
    identifier = models.CharField(max_length=50, default="seller")
    sellertype = models.CharField(max_length=20, null=True)
    verify = models.BooleanField(default=False)

class Code(models.Model):
    code = models.CharField(max_length=10)
    user = models.ForeignKey(user, on_delete=models.CASCADE, null= True)
    guide = models.ForeignKey(guide, on_delete=models.CASCADE,null= True)
    seller = models.ForeignKey(seller, on_delete=models.CASCADE,null= True)
    expiry = models.DateTimeField()
    
