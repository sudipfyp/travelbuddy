from django.db import models
from registration.models import user

# Create your models here.
class TourDetail(models.Model):
    place = models.CharField(max_length=100)
    days = models.IntegerField()
    description = models.TextField()
    budget = models.IntegerField()
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name = 'tour_detail')
    