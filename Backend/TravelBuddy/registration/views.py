from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import guide, seller, user, admin, Code
from .code import sendVerificationEmail

from .utils import verify_access_token
from datetime import datetime

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
            sendVerificationEmail(email)
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
            name = request.data.get('name')
            email = request.data.get('email')
            password = request.data.get('password')
            image = request.data.get('image')
            seller.objects.create(name=name, email=email,
                                  password=password, image=image)
            sendVerificationEmail(email)
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
            sendVerificationEmail(email)
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
            sellerdata = seller.objects.filter(
                email=emailid, password=password)

            if len(userData) > 0:
                if (userData[0].verify == False):
                    return Response({'msg': 'Not Verified'}, status=status.HTTP_401_UNAUTHORIZED)
                refresh = RefreshToken.for_user(user=userData[0])
                refresh["role"] = "user"
                role = "user"
                access_token = str(refresh.access_token)
            elif len(guideData) > 0:
                if (guideData[0].verify == False):
                    return Response({'msg': 'Not Verified'}, status=status.HTTP_401_UNAUTHORIZED)
                refresh = RefreshToken.for_user(user=guideData[0])
                refresh["role"] = "guide"
                role = "guide"
                access_token = str(refresh.access_token)
            elif len(sellerdata) > 0:
                if (sellerdata[0].verify == False):
                    return Response({'msg': 'Not Verified'}, status=status.HTTP_401_UNAUTHORIZED)
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
                sellerObj = seller.objects.filter(id=payload['user_id'])
                return Response({"role": "seller", "type": sellerObj[0].sellertype}, status=status.HTTP_200_OK)
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


class ProfileView(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                sellerObj = seller.objects.filter(id=payload['user_id'])
                serializer = SellerDataModelSerializer(sellerObj, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif payload['role'].lower() == "guide":
                guideObj = guide.objects.filter(id=payload['user_id'])
                serializer = GuideDataModelSerializer(guideObj, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif payload['role'].lower() == "user":
                userObj = user.objects.filter(id=payload['user_id'])
                serializer = UserDataModelSerializer(userObj, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({"msg": "Un-authorized user"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"msg": "Login first"}, status=status.HTTP_401_UNAUTHORIZED)


class GuideList(APIView):
    def get(self, request):
        guideObj = guide.objects.all()
        serializer = GuideDataModelSerializer(guideObj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SellerList(APIView):
    def get(self, request):
        sellerObj = seller.objects.all()
        serializer = SellerDataModelSerializer(sellerObj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserList(APIView):
    def get(self, request):
        userObj = user.objects.all()
        serializer = UserDataModelSerializer(userObj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CompleteGuideRegistration(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'guide':
                guideObj = guide.objects.filter(id=payload['user_id'])
                description = request.data.get('description')
                tag = request.data.get('tag')
                charge = request.data.get('charge')
                image = request.data.get('image')
                guideObj.update(description=description,
                                tag=tag, charge=charge, image=image)
                return Response({'msg': 'Data Updated Successfully'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class CompleteSellerRegistration(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'] == 'seller':
                sellerObj = seller.objects.filter(id=payload['user_id'])
                sellertype = request.data.get('sellertype')

                sellerObj.update(sellertype=sellertype)
                return Response({'msg': 'Type Updated Successfully'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Invalid User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class CodeVerification(APIView):
    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        userData = user.objects.filter(email=email)
        guideData = guide.objects.filter(email=email)
        sellerdata = seller.objects.filter(email=email)
        codeObj = None
        if len(userData) > 0:
            codeObj = Code.objects.filter(user_id=userData[0].id, code=code)
        elif len(guideData) > 0:
            codeObj = Code.objects.filter(guide_id=guideData[0].id, code=code)
        elif len(sellerdata) > 0:
            codeObj = Code.objects.filter(
                seller_id=sellerdata[0].id, code=code)
        if len(codeObj) == 0:
            return Response({'msg': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)

        if codeObj[0].code == code:
            if codeObj[0].expiry.replace(tzinfo=None) > datetime.now():
                if len(userData) > 0:
                    user.objects.filter(email=email).update(verify=True)
                elif len(guideData) > 0:
                    guide.objects.filter(email=email).update(verify=True)
                elif len(sellerdata) > 0:
                    seller.objects.filter(email=email).update(verify=True)
                return Response({'msg': 'Verified Successfully'}, status=status.HTTP_200_OK)
            return Response({'msg': 'Code Expired'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'msg': 'Invalid Code'}, status=status.HTTP_400_BAD_REQUEST)


class ResendCode(APIView):
    def post(self, request):
        email = request.data['email']
        data = sendVerificationEmail(email)
        if data:
            return Response({'msg': 'Code Sent'}, status=status.HTTP_200_OK)
        return Response({'msg': 'Code not Sent'}, status=status.HTTP_400_BAD_REQUEST)
