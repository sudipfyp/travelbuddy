from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import PlaceModelSerializer
from .models import Place
from registration.utils import verify_access_token


class PlaceAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "admin":
                serailizer = PlaceModelSerializer(data = request.data)
                if serailizer.is_valid():
                        name = request.data.get('name')
                        location = request.data.get('location')
                        latitude = request.data.get('latitude')
                        longitude = request.data.get('longitude')
                        tag = request.data.get('tag')
                        description = request.data.get('description')
                        image = request.data.get('image')
                        Place.objects.create(name = name, location = location, latitude = latitude, longitude = longitude, tag = tag , description = description, image = image  )
                        return Response({"msg":"Place Registered Successfully"}, status=status.HTTP_200_OK)
                return Response(serailizer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({"msg":"Only Valid to Admin"}, status=status.HTTP_403_FORBIDDEN)
        return Response({"msg":"Login first"}, status=status.HTTP_403_FORBIDDEN)
    
class PlaceEditView(APIView):
    pass

class PlaceDeleteView(APIView):
    pass

class PlaceListView(APIView):
    def get(self, request):
        placeObj = Place.objects.all()
        if len(placeObj) == 0:
            return Response({"msg":"Not Found"}, status=status.HTTP_404_NOT_FOUND)    
        serializer = PlaceModelSerializer(placeObj, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PlaceDetailView(APIView):
    pass



