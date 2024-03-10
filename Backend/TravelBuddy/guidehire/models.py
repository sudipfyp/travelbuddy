from django.db import models
from registration.models import user, guide

# Create your models here.
class GuideHire(models.Model):
    user = models.ForeignKey(user,  on_delete=models.CASCADE, related_name = "hireuser")
    guide = models.ForeignKey(guide,  on_delete=models.CASCADE, related_name = "hireguide")
    place = models.CharField(max_length = 50)
    status = models.CharField(max_length = 50, default = "ongoing")
    day = models.IntegerField()