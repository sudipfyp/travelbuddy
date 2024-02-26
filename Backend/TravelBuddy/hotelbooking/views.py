from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import HotelAddModelSerializer, HotelModelSerializer
from .models import Hotel
from registration.utils import verify_access_token



# Create your views here.

class HotelAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "seller":
                serailizer = HotelAddModelSerializer(data=request.data)
                if serailizer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    latitude = request.data.get('latitude')
                    longitude = request.data.get('longitude')
                    address = request.data.get('address')
                    image = request.data.get('image')
                    noOfRoom = request.data.get('noOfRoom')

                    Hotel.objects.create(name = name, description = description, latitude = latitude, longitude = longitude, address = address, image = image, noOfRoom = noOfRoom, owner_id = payload['user_id'])

                    return Response({"msg":"Hotel Registered Successfully"}, status=status.HTTP_200_OK)
                                
                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg':'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg':'Login First ', }, status=status.HTTP_403_FORBIDDEN)
            

class HotelListView(ListAPIView):
    def get(self, request):
        HotelDataObject = Hotel.objects.all()
        if len(HotelDataObject) == 0:
            return Response({"msg":"Hotel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HotelModelSerializer(HotelDataObject, many = True, context = {"request":self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class HotelEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "seller":
                HotelObject = Hotel.objects.filter(id = kwargs['id'], owner_id = payload['user_id'])
                if len(HotelObject) == 0:
                    return Response({"msg":"Hotel Not Found"},status=status.HTTP_404_NOT_FOUND)
                serializer = HotelAddModelSerializer(data = request.data)
                if serializer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    latitude = request.data.get('latitude')
                    longitude = request.data.get('longitude')
                    address = request.data.get('address')
                    image = request.data.get('image')
                    noOfRoom = request.data.get('noOfRoom')
                    HotelObject.update(name = name, description = description, latitude = latitude, longitude = longitude, address = address, image = image, noOfRoom = noOfRoom, owner_id = payload['user_id'])
                    return Response({'msg':'Edited' }, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg':'Non Authorized user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg':'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class HotelDeleteView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "seller":
                try:
                    Hotel.objects.get(id = kwargs['id'], owner_id = payload['user_id']).delete()
                    return Response({"msg":"Delete Successful"},status=status.HTTP_200_OK)
                except:
                    return Response({"msg":"Hotel Not Found"},status=status.HTTP_404_NOT_FOUND)
        return Response({'msg':'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class HotelDetailView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            hotelObj = Hotel.objects.get(id = kwargs['id'])
            serializer = HotelModelSerializer(hotelObj, context = {"request":self.request})
            return Response(serializer.data , status=status.HTTP_200_OK)
        except:
            return Response({'msg':'Not Found', }, status=status.HTTP_404_NOT_FOUND)

