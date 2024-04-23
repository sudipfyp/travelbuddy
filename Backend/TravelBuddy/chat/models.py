from django.db import models
from registration.models import guide, user, seller
# Create your models here.
class chat(models.Model):
    sender_guide = models.ForeignKey(guide, on_delete=models.CASCADE, null=True, related_name='sender_guide')
    sender_user = models.ForeignKey(user, on_delete=models.CASCADE, null=True, related_name='sender_user')
    sender_seller = models.ForeignKey(seller, on_delete=models.CASCADE, null=True, related_name='sender_seller')
    receiver_guide = models.ForeignKey(guide, on_delete=models.CASCADE, null=True, related_name='receiver_guide')
    receiver_user = models.ForeignKey(user, on_delete=models.CASCADE, null=True, related_name='receiver_user')
    receiver_seller = models.ForeignKey(seller, on_delete=models.CASCADE, null=True, related_name='receiver_seller')
    message = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
