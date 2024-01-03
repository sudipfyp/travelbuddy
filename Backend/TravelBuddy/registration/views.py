from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .serializer import UserModelSerializer, GuideModelSerializer, SellerModelSerializer


# Create your views here.
class RegistrationUser(CreateAPIView):
    serializer_class = UserModelSerializer

class SellerRegistration(CreateAPIView):
    serializer_class = SellerModelSerializer


class GuideRegistration(CreateAPIView):
    serializer_class = GuideModelSerializer