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
    rating = models.IntegerField(default=0)
    owner = models.ForeignKey(seller, on_delete=models.CASCADE, related_name="shop_seller")
    identifier = models.CharField(max_length=50, default="shop")