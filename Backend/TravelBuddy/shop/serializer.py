from rest_framework import serializers
from .models import Shop, Product
from registration.serializer import SellerDataModelSerializer

class ShopModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'description', 'latitude', 'longitude', 'address', 'image',  'identifier']


    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request and request.method == "GET":
            fields['owner'] = SellerDataModelSerializer()
        return fields

class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and request.method == "GET":
            fields['shop'] = ShopModelSerializer()
        return fields