from rest_framework import serializers
from .models import Hotel
from registration.serializer import SellerDataModelSerializer

class HotelAddModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name','description', 'latitude', 'longitude','address','image','noOfRoom']

class HotelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = "__all__"
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request and request.method == "GET":
            fields['owner'] = SellerDataModelSerializer()
        return fields

