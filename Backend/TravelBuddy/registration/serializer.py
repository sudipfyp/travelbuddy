from rest_framework import serializers
from .models import user, guide, seller, admin



class AdminModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin
        fields = '__all__'

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['name', 'email', 'address', 'password',
                  'nationality', 'preferredplace', 'image']
        
class UserDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id', 'name', 'email', 'address', 
                  'nationality', 'preferredplace', 'image']

class GuideModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = guide
        fields = ['name', 'email', 'address', 'phone',
                  'tag', 'password', 'image', 'charge']


class GuideDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = guide
        fields = ['id', 'name', 'email', 'description', 'address', 'phone',
                  'tag',  'charge', 'image', 'identifier']


class SellerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = seller
        fields = ['name', 'email', 'password', 'image']

class SellerDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = seller
        fields = ['id', 'name', 'email', 'image', 'sellertype']

class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 100)
    class Meta:
        model = admin
        fields = ['email', 'password']

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)

    class Meta:
        model = user
        fields = ['email', 'password']


class GuideLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)

    class Meta:
        model = guide
        fields = ['email', 'password']


class SellerLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)

    class Meta:
        model = seller
        fields = ['email', 'password']
