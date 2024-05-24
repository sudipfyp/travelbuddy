from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import HotelAddModelSerializer, HotelModelSerializer, HotelRoomModelSerializer, HotelRoomBookingModelSerializer, HotelRoomAddModelSerializer
from .models import Hotel, HotelRoom, HotelRoomBooking
from registration.utils import verify_access_token
from datetime import datetime, timedelta
from django.utils import timezone


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
                    location = request.data.get('location')
                    image = request.data.get('image')
                    noOfRoom = request.data.get('noOfRoom')

                    Hotel.objects.create(name=name, description=description, latitude=latitude, longitude=longitude,
                                         address=address, location=location, image=image, noOfRoom=noOfRoom, owner_id=payload['user_id'])

                    return Response({"msg": "Hotel Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class HotelListView(ListAPIView):
    def get(self, request):
        HotelDataObject = Hotel.objects.all()
        if len(HotelDataObject) == 0:
            return Response({"msg": "Hotel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HotelModelSerializer(
            HotelDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class HotelEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller" or payload['role'].lower() == "admin":
                HotelObject = None
                hotelobj = None

                if payload['role'].lower() == "seller":
                    HotelObject = Hotel.objects.filter(
                        id=kwargs['id'], owner_id=payload['user_id'])
                    hotelobj = Hotel.objects.get(
                        id=kwargs['id'], owner_id=payload['user_id'])

                elif payload['role'].lower() == "admin":
                    HotelObject = Hotel.objects.filter(id=kwargs['id'])
                    hotelobj = Hotel.objects.get(id=kwargs['id'])

                if len(HotelObject) == 0:
                    return Response({"msg": "Hotel Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = HotelAddModelSerializer(data=request.data)

                if serializer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    latitude = request.data.get('latitude')
                    longitude = request.data.get('longitude')
                    address = request.data.get('address')
                    location = request.data.get('location')
                    image = request.FILES.get('image')
                    noOfRoom = request.data.get('noOfRoom')
                    HotelObject.update(name=name, description=description, latitude=latitude, longitude=longitude,
                                       address=address, location=location, noOfRoom=noOfRoom, owner_id=payload['user_id'])
                    if image:
                        hotelobj.image = image
                        hotelobj.save()
                    return Response({'msg': 'Edited'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg': 'Non Authorized user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class HotelDeleteView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller" or payload['role'].lower() == "admin":
                try:
                    Hotel.objects.get(
                        id=kwargs['id']).delete()
                    return Response({"msg": "Delete Successful"}, status=status.HTTP_200_OK)
                except:
                    return Response({"msg": "Hotel Not Found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class HotelDetailView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            hotelObj = Hotel.objects.get(id=kwargs['id'])
            serializer = HotelModelSerializer(
                hotelObj, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'msg': 'Not Found', }, status=status.HTTP_404_NOT_FOUND)


class HotelDetailViewAdmin(APIView):
    def get(self, request, *args, **kwargs):

        hotelObj = Hotel.objects.filter(
            owner__id=kwargs['id']).select_related('owner')
        if len(hotelObj) == 0:
            return Response({'msg': 'Not Found', }, status=status.HTTP_404_NOT_FOUND)
        serializer = HotelModelSerializer(
            hotelObj, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class HotelRoomAddView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                serializer = HotelRoomAddModelSerializer(data=request.data)
                HotelObj = Hotel.objects.filter(owner_id=payload['user_id'])
                if len(HotelObj) == 0:
                    return Response({'msg': 'You have no hotels to add'}, status=status.HTTP_404_NOT_FOUND)
                if serializer.is_valid():
                    hotel = HotelObj[0].id
                    roomType = request.data.get('roomType')
                    roomPrice = request.data.get('roomPrice')
                    HotelRoom.objects.create(
                        hotel_id=hotel, roomType=roomType, roomPrice=roomPrice, )
                    return Response({'msg': 'Room Added'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg': 'Only Valid to seller'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class HotelRoomListView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            hotelRoomObj = HotelRoom.objects.filter(hotel_id=kwargs['id'])
            if len(hotelRoomObj) == 0:
                return Response({"msg": "Room Not Found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = HotelRoomModelSerializer(
                hotelRoomObj, many=True, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class HotelBooking(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                serializer = HotelRoomBookingModelSerializer(data=request.data)
                if serializer.is_valid():
                    hotelRoomId = kwargs['id']
                    current_datetime_date = datetime.now()
                    current_datetime_a = current_datetime_date.strftime(
                        '%Y-%m-%d')
                    current_datetime = datetime.strptime(
                        current_datetime_a, '%Y-%m-%d').date()
                    checkIn = request.data.get('checkIn')
                    checkOut = request.data.get('checkOut')
                    check_in = datetime.strptime(checkIn, '%Y-%m-%d').date()
                    check_out = datetime.strptime(checkOut, '%Y-%m-%d').date()
                    HotelRoomBookingObj = HotelRoomBooking.objects.filter(
                        room_id=hotelRoomId)

                    HotelRoomBooking.objects.create(
                        user_id=payload['user_id'], room_id=hotelRoomId, checkIn=check_in, checkOut=check_out)
                    return Response({'msg': 'Room Booked'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg': 'Only Valid to User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': ' Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class HotelRoomAccept(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                hotelRoomBookingObj = HotelRoomBooking.objects.filter(
                    id=kwargs['id'])
                if len(hotelRoomBookingObj) == 0:
                    return Response({'msg': 'Room Booking Not Found'}, status=status.HTTP_404_NOT_FOUND)
                hotelRoomBookingObj.update(status="accept")
                return Response({'msg': 'Room Booking Accepted'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class HotelRoomReject(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                hotelRoomBookingObj = HotelRoomBooking.objects.filter(
                    id=kwargs['id'])
                if len(hotelRoomBookingObj) == 0:
                    return Response({'msg': 'Room Booking Not Found'}, status=status.HTTP_404_NOT_FOUND)
                hotelRoomBookingObj.update(status="reject")
                return Response({'msg': 'Room Booking Accepted'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class UserHotelRoomCancel(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                hotelRoomBookingObj = HotelRoomBooking.objects.filter(
                    id=kwargs['id'], user_id=payload['user_id'])
                if len(hotelRoomBookingObj) == 0:
                    return Response({'msg': 'Room Booking Not Found'}, status=status.HTTP_404_NOT_FOUND)
                hotelRoomBookingObj.update(status="cancel")
                return Response({'msg': 'Room Booking Cancelled'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class RoomBookingUser(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                HotelRoomBookingObj = HotelRoomBooking.objects.filter(
                    user_id=payload['user_id'])
                if len(HotelRoomBookingObj) == 0:
                    return Response({"msg": "Room Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = HotelRoomBookingModelSerializer(
                    HotelRoomBookingObj, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class RoomBookingSeller(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                HotelRoomBookingObj = HotelRoomBooking.objects.filter(
                    room__hotel__owner_id=payload['user_id'])
                if len(HotelRoomBookingObj) == 0:
                    return Response({"msg": "Room Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = HotelRoomBookingModelSerializer(
                    HotelRoomBookingObj, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
