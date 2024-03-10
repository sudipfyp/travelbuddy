from django.db import models
from registration.models import seller

# Create your models here.

class Hotel(models.Model):
    name =  models.CharField( max_length=50)
    description = models.TextField() 
    latitude = models.TextField()
    longitude = models.TextField()
    address =  models.TextField()
    image = models.ImageField( upload_to=None, null = True)
    rating = models.IntegerField(default = 0)
    noOfRoom = models.IntegerField()
    owner = models.ForeignKey(seller, on_delete=models.CASCADE, related_name = "hotel_seller")
    identifier = models.CharField(max_length = 50, default = "hotel")


class HotelRoom(models.Model):
    pass
