from rest_framework import serializers
from .models import user, guide, seller

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = '__all__'

class GuideModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = guide
        fields = '__all__'

class SellerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = seller
        fields = '__all__'