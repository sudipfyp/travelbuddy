from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import GuideRequirementAddSerializer, GuideRequirementModelSerializer, GuideHiringAddModelSerializer, GuideHiringModelSerializer
from .models import GuideRequirement, GuideRequirementHiring
from registration.utils import verify_access_token
from django.utils import timezone
# Create your views here.


class GuideRequirementAdd(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                serailizer = GuideRequirementAddSerializer(data=request.data)
                if serailizer.is_valid():
                    title = request.data.get('title')
                    description = request.data.get('description')
                    location = request.data.get('location')
                    date = request.data.get('date')
                    budget = request.data.get("budget")

                    GuideRequirement.objects.create(
                        title=title, description=description, location=location, date=date, user_id=payload['user_id'], budget=budget)

                    return Response({"msg": "Guide Requirement Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Valid to user ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequirementDelete(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementObject = GuideRequirement.objects.filter(
                    id=kwargs['id'], user_id=payload['user_id'])
                if len(GuideRequirementObject) == 0:
                    return Response({"msg": "Guide Requirement Not Found"}, status=status.HTTP_404_NOT_FOUND)
                GuideRequirementObject.delete()
                return Response({"msg": "Guide Requirement Deleted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequirementEdit(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementObject = GuideRequirement.objects.filter(
                    id=kwargs['id'], user_id=payload['user_id'])
                if len(GuideRequirementObject) == 0:
                    return Response({"msg": "Guide Requirement Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = GuideRequirementAddSerializer(data=request.data)
                if serializer.is_valid():
                    title = request.data.get('title')
                    description = request.data.get('description')
                    location = request.data.get('location')
                    date = request.data.get('date')
                    status = request.data.get('status')
                    GuideRequirementObject.update(
                        title=title, description=description, location=location, date=date, status=status, user_id=payload['user_id'])
                    return Response({"msg": "Guide Requirement Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequirementDetailView(APIView):
    def get(self, request, *args, **kwargs):
        GuideRequirementObject = GuideRequirement.objects.filter(
            id=kwargs['id'])
        if len(GuideRequirementObject) == 0:
            return Response({"msg": "Guide Requirement Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = GuideRequirementModelSerializer(
            GuideRequirementObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class GuideRequirementListView(APIView):
    def get(self, request):
        GuideRequirementDataObject = GuideRequirement.objects.all()
        if len(GuideRequirementDataObject) == 0:
            return Response({"msg": "Guide Requirement Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = GuideRequirementModelSerializer(
            GuideRequirementDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class GuideRequirementListViewFilter(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        GuideRequirementDataObject = GuideRequirement.objects.filter(
            user_id=payload['user_id'])
        if len(GuideRequirementDataObject) == 0:
            return Response({"msg": "Guide Requirement Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = GuideRequirementModelSerializer(
            GuideRequirementDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentGuideRequirementWorker(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                guidereq_id=kwargs['id'], status='accepted')
            if len(GuideRequirementHiringObject) == 0:
                return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = GuideHiringModelSerializer(
                GuideRequirementHiringObject, many=True, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequestApply(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "guide":
                serailizer = GuideHiringAddModelSerializer(data=request.data)
                guiereqObj = GuideRequirementHiring.objects.filter(guide_id = payload['user_id'], guidereq_id = kwargs['id'])
                if len(guiereqObj) > 0:
                    return Response({"msg": "You have already applied for this job"}, status=status.HTTP_403_FORBIDDEN)
                if serailizer.is_valid():
                    guidereq = kwargs['id']
                    price = request.data.get('price')

                    GuideRequirementHiring.objects.create(
                        guidereq_id=guidereq, guide_id=payload['user_id'], price=price)

                    return Response({"msg": "Guide Requirement Hiring Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Valid to guide ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequestAccept(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(id=kwargs['id'])
                guideRequirementId = GuideRequirementHiringObject[0].guidereq_id
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                GuideRequirementHiringObject.update(status='accepted')
                GuideRequirement.objects.filter(
                    id=guideRequirementId).update(status='accepted')
                GuideRequirementAllObject = GuideRequirementHiring.objects.filter(
                    guidereq_id=guideRequirementId).exclude(id=kwargs['id']).update(status='rejected')
                return Response({"msg": "Guide Requirement Hiring Accepted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to guide ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideRequestReject(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                    id=kwargs['id'])
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                GuideRequirementHiringObject.update(status='rejected')
                return Response({"msg": "Guide Requirement Hiring Rejected Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to guide ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ProposalList(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                    guidereq_id=kwargs['id'])
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = GuideHiringModelSerializer(
                    GuideRequirementHiringObject, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to user ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class CurrentWorkerListView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "guide":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                    guide_id=payload['user_id'], status='accepted')
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = GuideHiringModelSerializer(
                    GuideRequirementHiringObject, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to guide ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class UserTotalCurrentJob(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                    guidereq__user_id=payload['user_id']).select_related('guidereq')
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = GuideHiringModelSerializer(
                    GuideRequirementHiringObject, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to user ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class GuideTotalCurrentJob(APIView):
    def get(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "guide":
                GuideRequirementHiringObject = GuideRequirementHiring.objects.filter(
                    guide_id=payload['user_id'], status='accepted')
                if len(GuideRequirementHiringObject) == 0:
                    return Response({"msg": "Guide Requirement Hiring Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = GuideHiringModelSerializer(
                    GuideRequirementHiringObject, many=True, context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'msg': 'Valid to guide ', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)
