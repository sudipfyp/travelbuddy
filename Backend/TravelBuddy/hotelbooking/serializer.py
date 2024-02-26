from rest_framework import serializers
from .models import Hotel

class HotelAddModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name','description', 'latitude', 'longitude','address','image','noOfRoom']

class HotelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = "__all__"


