from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import TourDetailSerializer
from .models import TourDetail
from registration.utils import verify_access_token

# Create your views here.

class TourAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                serailizer = TourDetailSerializer(data=request.data)
                if serailizer.is_valid():
                    place = request.data.get('place')
                    days = request.data.get('days')
                    description = request.data.get('description')
                    budget = request.data.get('budget')

                    TourDetail.objects.create(place=place, days=days, description=description, budget=budget, user_id=payload['id'])

                    return Response({"msg": "Tour Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class TourDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                TourObject = TourDetail.objects.filter(id=kwargs['id'])
                if len(TourObject) == 0:
                    return Response({"msg": "Tour Not Found"}, status=status.HTTP_404_NOT_FOUND)
                TourObject.delete()
                return Response({"msg": "Tour Deleted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
    
class TourEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                TourObject = TourDetail.objects.filter(id=kwargs['id'])
                if len(TourObject) == 0:
                    return Response({"msg": "Tour Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serailizer = TourDetailSerializer(TourObject, data=request.data)
                if serailizer.is_valid():
                    place = request.data.get('place')
                    days = request.data.get('days')
                    description = request.data.get('description')
                    budget = request.data.get('budget')
                    TourObject.update(place=place, days=days, description=description, budget=budget)
                    return Response({"msg": "Tour Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class TourDetailView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            TourObject = TourDetail.objects.filter(id=kwargs['id'])
            if len(TourObject) == 0:
                return Response({"msg": "Tour Not Found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = TourDetailSerializer(TourObject, many=True, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
    
class TourListView(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            TourDataObject = TourDetail.objects.all()
            if len(TourDataObject) == 0:
                return Response({"msg": "Tour Not Found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = TourDetailSerializer(TourDataObject, many=True, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
    

