from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from .serializer import *

from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from .models import guide, seller, user

from .utils import verify_access_token

# Create your views here.


class UserRegistration(CreateAPIView):
    serializer_class = UserModelSerializer


class SellerRegistration(CreateAPIView):
    serializer_class = SellerModelSerializer


class GuideRegistration(CreateAPIView):
    serializer_class = GuideModelSerializer


class loginUser(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            emailid = request.data.get('email')
            password = request.data.get('password')

            try:
                user = user.objects.get(email=emailid, password=password)

            except:
                user = None

            if user:
                # refresh = RefreshToken.for_user(user={"id":user["email"],"role":"user"})  # replace 'user' with the authenticated user
                refresh = RefreshToken.for_user(user=user)
                refresh["role"] = "user"
                access_token = str(refresh.access_token)
                response = Response(
                    {'success': 'Login Successful', 'token': access_token}, status=status.HTTP_200_OK)
                response.set_cookie('token', access_token,
                                    secure=True, httponly=False, samesite='None')
                return response
            else:
                return Response({'error': 'Invalid Id or password'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class loginGuide(APIView):
    def post(self, request, format=None):
        serializer = GuideLoginSerializer(data=request.data)
        if serializer.is_valid():
            emailid = request.data.get('email')
            password = request.data.get('password')

            try:
                user = guide.objects.get(email=emailid, password=password)

            except:
                user = None

            if user:
                # refresh = RefreshToken.for_user(user={"id":user["email"],"role":"user"})  # replace 'user' with the authenticated user
                refresh = RefreshToken.for_user(user=user)
                refresh["role"] = "guide"
                access_token = str(refresh.access_token)
                response = Response(
                    {'success': 'Login Successful', 'token': access_token}, status=status.HTTP_200_OK)
                response.set_cookie('token', access_token,
                                    secure=True, httponly=False, samesite='None')
                return response
            else:
                return Response({'error': 'Invalid Id or password'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class loginSeller(APIView):
    def post(self, request, format=None):
        serializer = SellerLoginSerializer(data=request.data)

        if serializer.is_valid():
            emailid = request.data.get('email')
            password = request.data.get('password')

            try:
                user = seller.objects.get(email=emailid, password=password)

            except:
                user = None

            if user:
                # refresh = RefreshToken.for_user(user={"id":user["email"],"role":"user"})  # replace 'user' with the authenticated user
                refresh = RefreshToken.for_user(user=user)
                refresh["role"] = "seller"
                access_token = str(refresh.access_token)
                response = Response(
                    {'success': 'Login Successful', 'token': access_token}, status=status.HTTP_200_OK)
                response.set_cookie('token', access_token,
                                    secure=True, httponly=False, samesite='None')
                return response
            else:
                return Response({'error': 'Invalid Id or password'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class profileView(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            return Response({'msg': 'Profile Page', 'data': payload}, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
