from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status

from .models import Rating
from .serializer import RatingModelSerializer
from registration.utils import verify_access_token
from guidefind.models import GuideRequirementHiring
from guidehire.models import GuideHire
from registration.models import guide

# Create your views here.
class Rate(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            serailizer = RatingModelSerializer(data = request.data)
            guidereq = kwargs['id']
            RatingObj = Rating.objects.filter(user_id = payload['user_id'], guidereq_id = guidereq)
            if len(RatingObj) > 0:
                return Response({"message": "You have already rated this guide"}, status = status.HTTP_400_BAD_REQUEST)
            if serailizer.is_valid():
                rating = request.data.get('rating')
                guidereqObj = GuideRequirementHiring.objects.get(id = guidereq)
                Rating.objects.create(rating = rating, user_id = payload['user_id'], guidereq_id = guidereq , guide_id = guidereqObj.guide_id)

                ratingObj = Rating.objects.filter(guide_id = guidereqObj.guide_id)
                total = 0
                for i in ratingObj:
                    total += i.rating
                avg = total/len(ratingObj)
                guideObj = guide.objects.filter(id = guidereqObj.guide_id).update(rating = avg)
                return Response({"message": "Rating added successfully"}, status = status.HTTP_200_OK)


class RateGuideHire(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            serailizer = RatingModelSerializer(data = request.data)
            guidereq = kwargs['id']
            RatingObj = Rating.objects.filter(user_id = payload['user_id'], guidehire_id = guidereq)
            if len(RatingObj) > 0:
                return Response({"message": "You have already rated this guide"}, status = status.HTTP_400_BAD_REQUEST)
            if serailizer.is_valid():
                rating = request.data.get('rating')
                guidehire = GuideHire.objects.get(id = guidereq)
                Rating.objects.create(rating = rating, user_id = payload['user_id'], guidehire_id = guidereq , guide_id = guidehire.guide_id)

                ratingObj = Rating.objects.filter(guide_id = guidehire.guide_id)
                total = 0
                for i in ratingObj:
                    total += i.rating
                avg = total/len(ratingObj)
                guideObj = guide.objects.filter(id = guidehire.guide_id).update(rating = avg)
                return Response({"message": "Rating added successfully"}, status = status.HTTP_200_OK)
