from django.db import models
from registration.models import seller

# Create your models here.
class Shop(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    latitude = models.TextField()
    longitude = models.TextField()
    address = models.TextField()
    image = models.ImageField(upload_to='shop', null=True)
    owner = models.ForeignKey(seller, on_delete=models.CASCADE, related_name="shop_seller")
    identifier = models.CharField(max_length=50, default="shop")

class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="shop_product")
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='product', null=True)
    tag = models.CharField(max_length=50, null=True)
    identifier = models.CharField(max_length=50, default="product")