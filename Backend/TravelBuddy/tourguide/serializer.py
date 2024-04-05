from rest_framework import serializers
from .models import TourDetail

class TourDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDetail
        fields = ['place', 'days', 'description', 'budget']
