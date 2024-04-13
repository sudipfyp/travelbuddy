from django.db import models

# Create your models here.


class Place(models.Model):
    name = models.CharField(max_length=50)
    location = models.TextField()
    district = models.TextField(null=True)
    latitude = models.TextField()
    longitude = models.TextField()
    tag = models.TextField()
    description = models.TextField()
    image = models.ImageField(upload_to='place', null=True)
    identifier = models.CharField(max_length=50, default="place")
