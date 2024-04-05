from rest_framework import serializers
from .models import Place

class PlaceModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id','name','location','district','latitude','longitude','tag','description','image','identifier']

