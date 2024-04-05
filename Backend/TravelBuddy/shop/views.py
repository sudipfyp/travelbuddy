from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import ShopModelSerializer
from .models import Shop
from registration.utils import verify_access_token


# Create your views here.
class ShopAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                serailizer = ShopModelSerializer(data=request.data)
                if serailizer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    latitude = request.data.get('latitude')
                    longitude = request.data.get('longitude')
                    address = request.data.get('address')
                    image = request.data.get('image')

                    Shop.objects.create(name=name, description=description, latitude=latitude, longitude=longitude,
                                         address=address, image=image, owner_id=payload['user_id'])

                    return Response({"msg": "Shop Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
    
class ShopEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                ShopObject = Shop.objects.filter(id=kwargs['id'], owner_id=payload['user_id'])
                if len(ShopObject) == 0:
                    return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = ShopModelSerializer(data=request.data)
                if serializer.is_valid():
                    ShopObject.update(**serializer.validated_data)
                    return Response({"msg": "Shop Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
class ShopListView(APIView):
    def get(self, request):
        ShopDataObject = Shop.objects.all()
        if len(ShopDataObject) == 0:
            return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShopModelSerializer(ShopDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)