from rest_framework import serializers
from .models import Rating

class RatingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['rating']
    