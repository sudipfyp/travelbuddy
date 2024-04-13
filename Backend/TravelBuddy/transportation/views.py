from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .models import Transportation, StopPoint
from .serializer import TransportationModelSerializer, StopPointModelSerializer
from registration.utils import verify_access_token

class TransportationAddView(APIView):
    def post(self, request):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                serializer = TransportationModelSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Transportation added successfully'}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class StopPointAddView(APIView):
    def post(self, request):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                serializer = StopPointModelSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Stop Point added successfully'}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class TransportationListView(APIView):
    def get(self, request):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            transportations = Transportation.objects.all()
            serializer = TransportationModelSerializer(transportations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    
class StopPointListView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            stop_points = StopPoint.objects.filter(kwargs['id'])
            serializer = StopPointModelSerializer(stop_points, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class StopPointDeleteView(APIView):
    def delete(self, request, *args, **kwargs):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                stop_point = StopPoint.objects.get(kwargs['id'])
                stop_point.delete()
                return Response({'message': 'Stop Point deleted successfully'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


class TransportationDeleteView(APIView):
    def delete(self, request, *args, **kwargs):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                stop_point = Transportation.objects.get(kwargs['id'])
                stop_point.delete()
                return Response({'message': 'Transportation deleted successfully'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class TransportationEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                transportation = Transportation.objects.get(kwargs['id'])
                serializer = TransportationModelSerializer(transportation, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Transportation updated successfully'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

class StopPointEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.data.get('access_token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'admin':
                stop_point = StopPoint.objects.get(kwargs['id'])
                serializer = StopPointModelSerializer(stop_point, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Stop Point updated successfully'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


