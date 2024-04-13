from django.db import models
from registration.models import user, guide


# Create your models here.
class GuideRequirement(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name='guide_requirement')
    title = models.TextField()
    description = models.TextField()
    location = models.TextField()
    date = models.DateField()
    budget = models.IntegerField(null=True)
    status = models.CharField(default='active', max_length=50)

class GuideRequirementHiring(models.Model):
    guidereq = models.ForeignKey(GuideRequirement, on_delete=models.CASCADE, related_name='guide_requirement_hiring')
    guide = models.ForeignKey(guide, on_delete=models.CASCADE, related_name='guide_requirement_hiring')
    status = models.CharField(default='pending', max_length=50)
    price = models.FloatField()

    
