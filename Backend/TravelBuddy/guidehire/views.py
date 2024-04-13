from guidefind.models import GuideRequirementHiring
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
import json
import requests
from django.http import HttpResponseRedirect

# Create your views here.


class GuideHireView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                guideId = kwargs['id']
                userId = payload['user_id']
                guideObj = guide.objects.filter(id=guideId)
                if len(guideObj) == 0:
                    return Response({'msg': 'Guide Not found'}, status=status.HTTP_404_NOT_FOUND)

                serializer = GuideHireModelSerializer(data=request.data)
                if serializer.is_valid():
                    place = request.data.get('place')
                    day = request.data.get('day')
                    date = request.data.get('date')
                    GuideHire.objects.create(
                        user_id=userId, guide_id=guideId, place=place, day=day, date=date)
                    return Response({'msg': 'Guide Hire Apply Successfull'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg': 'Only Valid to client'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': ' Login First'}, status=status.HTTP_401_UNAUTHORIZED)

# hire/list


class GuideHireProposal(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        print("token:  ", token)
        if verification:
            if payload['role'].lower() == "guide":
                guideId = payload['user_id']
                guideObj = GuideHire.objects.filter(guide_id=guideId)
                serializer = GuideHireViewModelSerializer(
                    guideObj, many=True,  context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'msg': 'Only Valid to Guide'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


# hire/current
class CurrentGuideHire(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                userId = payload['user_id']
                guideObj = GuideHire.objects.filter(user_id=userId)
                serializer = GuideHireViewModelSerializer(
                    guideObj, many=True,  context={"request": self.request})
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({'msg': 'Only Valid to User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class GuideHireProposalAccept(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "guide":
                proposalId = kwargs['id']
                guideId = payload['user_id']
                guideObj = GuideHire.objects.filter(
                    id=proposalId, guide_id=guideId, status='ongoing')
                guideObj.update(status="hired")
                return Response({'msg': 'hired successfully'}, status=status.HTTP_200_OK)

            return Response({'msg': 'Only Valid to Guide'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class GuideHireProposalReject(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "guide":
                proposalId = kwargs['id']
                guideId = payload['user_id']
                guideObj = GuideHire.objects.filter(
                    id=proposalId, guide_id=guideId, status='ongoing')
                guideObj.update(status="rejected")
                return Response({'msg': 'Rejected successfully'}, status=status.HTTP_200_OK)

            return Response({'msg': 'Only Valid to Guide'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class GuideHireCancel(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "user":
                proposalId = kwargs['id']
                userId = payload['user_id']
                guideObj = GuideHire.objects.filter(
                    id=proposalId, user_id=userId, status='ongoing')
                guideObj.update(status="cancelled")
                return Response({'msg': 'Cancelled successfully'}, status=status.HTTP_200_OK)

            return Response({'msg': 'Only Valid to User'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'msg': 'Login First'}, status=status.HTTP_401_UNAUTHORIZED)


class pay(APIView):
    def post(self, request, *args, **kwargs):
        khaltiAPI = "https://a.khalti.com/api/v2/epayment/initiate/"
        website_url = "http://localhost:8000/"

        amount = int(request.data.get("amount"))*100
        jobtype = request.data.get("jobtype")
        jobId = request.data.get("jobid")
        k = 0
        if jobtype == "hiring":
            key = 1

        return_url = "http://localhost:8000/guide/pay/" + \
            str(jobId)+"/"+str(key)+"/"
        purchase_order_id = "111111111"
        purchase_name = "test"

        headers = {
            'Authorization': 'key 74a324b745f74fa8aa2d8be8128e5ede',
            'Content-Type': 'application/json',
        }

        payload = json.dumps({
            "return_url": return_url,
            "website_url": website_url,
            "amount": amount,
            "purchase_order_id": purchase_order_id,
            "purchase_order_name": purchase_name,

        })

        response = requests.post(khaltiAPI, data=payload, headers=headers)

        new_res = json.loads(response.text)
        print(new_res)
        if new_res['payment_url']:
            return Response({'msg': new_res['payment_url']}, status=status.HTTP_200_OK)
        return Response({'msg': 'Failure'}, status=status.HTTP_400_BAD_REQUEST)


class payverify(APIView):
    def get(self, request, *args, **kwargs):
        jobid = kwargs['id']
        key = kwargs['key']
        url = "https://a.khalti.com/api/v2/epayment/lookup/"

        if request.method == 'GET':
            headers = {
                'Authorization': 'key 74a324b745f74fa8aa2d8be8128e5ede',
                'Content-Type': 'application/json',
            }
            pidx = request.GET.get('pidx')
            payload = json.dumps({
                'pidx': pidx
            })
            res = requests.request('POST', url, headers=headers, data=payload)
            new_res = json.loads(res.text)

            if new_res['status'] == 'Completed':
                amount = new_res['total_amount']/100
                if key == 1:
                    proposalId = GuideHire.objects.filter(
                        id=jobid).update(status="payed")
                    return HttpResponseRedirect('http://localhost:3000/login')
                else:
                    GuideRequirementHiring.objects.filter(
                        id=jobid).update(status="payed")
                    return HttpResponseRedirect('http://localhost:3000/login')

            return Response({'msg': 'Payment Not Completed'}, status=status.HTTP_400_BAD_REQUEST)
