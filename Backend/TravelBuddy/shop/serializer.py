from rest_framework import serializers
from .models import Shop
from registration.serializer import SellerDataModelSerializer

class ShopModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['name', 'description', 'latitude', 'longitude', 'address', 'image', 'rating',  'identifier']


    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request and request.method == "GET":
            fields['owner'] = SellerDataModelSerializer()
        return fields
