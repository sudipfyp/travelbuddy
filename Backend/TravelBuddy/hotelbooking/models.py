from django.db import models
from registration.models import seller

# Create your models here.

class Hotel(models.Model):
    name =  models.CharField( max_length=50)
    description = models.TextField() 
    latitude = models.TextField()
    longitude = models.TextField()
    address =  models.TextField()
    location = models.TextField(null=True)
    image = models.ImageField( upload_to='hotel', null = True)
    noOfRoom = models.IntegerField()
    owner = models.ForeignKey(seller, on_delete=models.CASCADE, related_name = "hotel_seller")
    identifier = models.CharField(max_length = 50, default = "hotel")

class HotelRoom(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name = "hotel_room")
    roomType = models.CharField(max_length = 50)
    roomPrice = models.IntegerField()
    
class HotelRoomBooking(models.Model):
    user = models.ForeignKey(seller, on_delete=models.CASCADE, related_name = "hotel_booking_user_hb")
    room = models.ForeignKey(HotelRoom, on_delete=models.CASCADE, related_name = "hotel_booking_room_hb")
    checkIn = models.DateField()
    checkOut = models.DateField()
    amount = models.IntegerField( null=True)
    status = models.CharField(max_length = 50, default = "pending")


