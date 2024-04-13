from django.db import models

# Create your models here.
class Transportation(models.Model):
    startpoint = models.CharField(max_length=50)
    endpoint = models.CharField(max_length=50)
    vehicleName = models.TextField()

class StopPoint(models.Model):
    transportation = models.ForeignKey(Transportation, on_delete=models.CASCADE, related_name = "stoppoint_transportation")
    stoppoint = models.CharField(max_length=50)

