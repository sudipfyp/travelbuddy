from django.db import models
from registration.models import seller, guide
from guidefind.models import GuideRequirementHiring
from guidehire.models import GuideHire

# Create your models here.

class Rating(models.Model):
    rating = models.IntegerField()
    user = models.ForeignKey(seller, on_delete=models.CASCADE, related_name = "rating_user")
    guide = models.ForeignKey(guide, on_delete=models.CASCADE, related_name = "rating_guide")
    guidereq = models.ForeignKey(GuideRequirementHiring, on_delete=models.CASCADE, related_name = "rating_guidereq", null = True)
    guidehire = models.ForeignKey(GuideHire, on_delete=models.CASCADE, related_name = "rating_guidehire" , null = True)
    
