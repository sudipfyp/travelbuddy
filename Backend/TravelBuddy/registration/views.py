from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import guide, seller, user, admin

from .utils import verify_access_token

# Create your views here.


class AdminRegisteration(APIView):
    def post(self, request):
        serializer = AdminModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegistration(CreateAPIView):
    def post(self, request):
        email = request.data.get('email')
        guideObj = guide.objects.filter(email=email)
        sellerObj = seller.objects.filter(email=email)
        userObj = user.objects.filter(email=email)
        if len(guideObj) or len(sellerObj) or len(userObj):
            return Response({'msg': 'Email already Exist'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Registered Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SellerRegistration(CreateAPIView):
    def post(self, request):
        email = request.data.get('email')
        guideObj = guide.objects.filter(email=email)
        sellerObj = seller.objects.filter(email=email)
        userObj = user.objects.filter(email=email)
        if len(guideObj) or len(sellerObj) or len(userObj):
            return Response({'msg': 'Email already Exist'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SellerModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Registered Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GuideRegistration(CreateAPIView):
    def post(self, request):
        email = request.data.get('email')
        guideObj = guide.objects.filter(email=email)
        sellerObj = seller.objects.filter(email=email)
        userObj = user.objects.filter(email=email)
        if len(guideObj) or len(sellerObj) or len(userObj):
            return Response({'msg': 'Email already Exist'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = GuideModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Data Registered Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class loginUser(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            emailid = request.data.get('email')
            password = request.data.get('password')
            role = ""
            adminData = admin.objects.filter(email=emailid, password=password)
            userData = user.objects.filter(email=emailid, password=password)
            guideData = guide.objects.filter(email=emailid, password=password)
            sellerdata = seller.objects.filter(email=emailid, password=password)

            if len(userData) > 0:
                refresh = RefreshToken.for_user(user=userData[0])
                refresh["role"] = "user"
                role = "user"
                access_token = str(refresh.access_token)
            elif len(guideData) > 0:
                refresh = RefreshToken.for_user(user=guideData[0])
                refresh["role"] = "guide"
                role = "guide"
                access_token = str(refresh.access_token)
            elif len(sellerdata) > 0:
                refresh = RefreshToken.for_user(user=sellerdata[0])
                refresh["role"] = "seller"
                role = "seller"
                access_token = str(refresh.access_token)
            elif len(adminData) > 0:
                refresh = RefreshToken.for_user(user=adminData[0])
                refresh["role"] = "admin"
                role = "admin"
                access_token = str(refresh.access_token)
            else:
                return Response({'msg': 'Invalid Id or password'}, status=status.HTTP_404_NOT_FOUND)

            response = Response({'success': 'Login Successful',
                                'token': access_token, 'role': role}, status=status.HTTP_200_OK)
            response.set_cookie('token', access_token,
                                secure=True, httponly=False, samesite='None')
            return response
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class profileView(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            return Response({'msg': 'Profile Page', 'data': payload}, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def get(self, request):
        response = Response({"msg": "Log out successfully"},
                            status=status.HTTP_200_OK)
        response.delete_cookie('token', samesite="None")
        return response


class UserCheck(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                return Response({"role": "seller"}, status=status.HTTP_200_OK)
            elif payload['role'].lower() == "guide":
                return Response({"role": "guide"}, status=status.HTTP_200_OK)
            elif payload['role'].lower() == "user":
                return Response({"role": "user"}, status=status.HTTP_200_OK)
            elif payload['role'].lower() == "admin":
                return Response({"role": "admin"}, status=status.HTTP_200_OK)
            return Response({"msg": "Un-authorized user"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"msg": "Login first"}, status=status.HTTP_403_FORBIDDEN)


class GuideDataView(APIView):
    def get(self, request):
        guideObj = guide.objects.all()
        serializer = GuideDataModelSerializer(guideObj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GuideDetailView(APIView):
    def get(self, request, *args, **kwargs):
        guideObj = guide.objects.filter(id=kwargs['id'])
        if len(guideObj) == 0:
            return Response({"msg": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = GuideDataModelSerializer(guideObj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
