from django.db import models

# Create your models here.


class Place(models.Model):
    name = models.CharField(max_length=50)
    location = models.TextField()
    latitude = models.TextField()
    longitude = models.TextField()
    tag = models.TextField()
    description = models.TextField()
    image = models.ImageField(null=True, upload_to='image/place')
    identifier = models.CharField(max_length=50, default="place")
