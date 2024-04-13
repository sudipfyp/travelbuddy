from rest_framework import serializers
from .models import Hotel, HotelRoom, HotelRoomBooking
from registration.serializer import SellerDataModelSerializer

class HotelAddModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['name','description', 'latitude', 'longitude','address', 'location','image','noOfRoom']

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
class HotelRoomModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoom
        fields = "__all__"
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and request.method == "GET":
            fields['hotel'] = HotelModelSerializer()
        return fields

class HotelRoomAddModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoom
        fields = ['roomType','roomPrice']

class HotelRoomBookingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoomBooking
        fields = ['room','checkIn','checkOut','status','amount']
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and request.method == "GET":
            fields['user'] = SellerDataModelSerializer()
            fields['room'] = HotelRoomModelSerializer()
        return fields

