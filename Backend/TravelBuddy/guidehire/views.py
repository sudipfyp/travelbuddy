from django.shortcuts import render
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from registration.utils import verify_access_token
from .serializer import GuideHireModelSerializer, GuideHireViewModelSerializer
from .models import GuideHire
from registration.models import guide

# Create your views here.
class GuideHireView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        print(token, verification)
        if verification:
            if payload['role'].lower() == "user":
                guideId = kwargs['id']
                userId = payload['user_id']
                guideObj = guide.objects.filter(id = guideId)
                if len(guideObj) == 0 :
                    return Response({'msg':'Guide Not found'}, status=status.HTTP_404_NOT_FOUND)

                serializer = GuideHireModelSerializer(data = request.data)
                if serializer.is_valid():
                    place = request.data.get('place')
                    day = request.data.get('day')
                    GuideHire.objects.create(user_id = userId, guide_id = guideId, place = place, day = day )
                    return Response({'msg':'Guide Hire Apply Successfull'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg':'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg':' Login First'}, status=status.HTTP_401_UNAUTHORIZED)
    
class GuideHireProposal(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "guide":
                guideId = payload['user_id']
                guideObj = GuideHire.objects.filter(guide_id = guideId, status = 'ongoing')
                serializer = GuideHireViewModelSerializer(guideObj, many = True,  context = {"request":self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'msg':'Only Valid to Guide'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg':'Login First'}, status=status.HTTP_401_UNAUTHORIZED)
    
class GuideHireProposalAccept(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token) 
        if verification:
            if payload['role'].lower() == "guide":
                proposalId = kwargs['id']
                guideId = payload['user_id']
                guideObj = GuideHire.objects.filter(id = proposalId, guide_id = guideId, status = 'ongoing')
                guideObj.update(status="hired")
                return Response({'msg':'hired successfully'}, status=status.HTTP_200_OK)

            return Response({'msg':'Only Valid to Guide'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg':'Login First'}, status=status.HTTP_401_UNAUTHORIZED)

