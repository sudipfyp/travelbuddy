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

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 100)
    class Meta:
        model = user
        fields = ['email', 'password']

class GuideLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 100)
    class Meta:
        model = guide
        fields = ['email', 'password']

class SellerLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 100)
    class Meta:
        model = seller
        fields = ['email', 'password']