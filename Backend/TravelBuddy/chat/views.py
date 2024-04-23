from django.shortcuts import render
from registration.utils import verify_access_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import chat
from django.db.models import Q

# Create your views here.

class chatApi(APIView):
    def post(self, request):
        token = request.COOKIES.get('token')
        verification, payload = verify_access_token(token)
        if verification:
            message = request.data.get('message')
            receiver_id = request.data.get('receiver_id')
            receiver_role = request.data.get('receiver_role')
            print(message,receiver_id,receiver_role)
            if payload['role'].lower() == 'seller':
                if receiver_role == 'user':
                    chat.objects.create( sender_seller_id=payload['user_id'], receiver_user_id=receiver_id, message=message)
                    return Response({'message': 'Message Sent'}, status=status.HTTP_200_OK)
                return Response({'msg':'not user'}, status=status.HTTP_401_UNAUTHORIZED)
            if payload['role'].lower() == 'user':
                if receiver_role == 'seller':
                    chat.objects.create( sender_user_id=payload['user_id'], receiver_seller_id=receiver_id, message=message)
                    return Response({'message': 'Message Sent'}, status=status.HTTP_200_OK)
                return Response({'msg':'not seller'}, status=status.HTTP_401_UNAUTHORIZED)
                if receiver_role == 'guide':
                    chat.objects.create( sender_user_id=payload['user_id'], receiver_guide_id=receiver_id, message=message)
                    return Response({'message': 'Message Sent'}, status=status.HTTP_200_OK)
                return Response({'msg':'not guide'}, status=status.HTTP_401_UNAUTHORIZED)
            if payload['role'] == 'guide':
                if receiver_role == 'user':
                    chat.objects.create( sender_guide_id=payload['user_id'], receiver_user_id=receiver_id, message=message)
                    return Response({'message': 'Message Sent'}, status=status.HTTP_200_OK)    
                return Response({'msg':'not user'}, status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({'message': 'error'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

from .serializer import ChatSerializer
class chatView(APIView):
    def post(self, request):
        
        receiver_id = request.data.get('receiver_id')
        receiver_role = request.data.get('receiver_role')
        token = request.COOKIES.get('token')
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == 'seller':
                if receiver_role == 'user':
                    chat_data = chat.objects.filter(Q(sender_seller_id=payload['user_id']) | Q(sender_seller_id=payload['user_id']), Q(receiver_user_id=receiver_id) | Q(sender_user_id = receiver_id))
                    serializer = ChatSerializer(chat_data, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            if payload['role'].lower() == 'user':
                if receiver_role == 'seller':
                    chat_data = chat.objects.filter(Q(receiver_user_id=receiver_id) | Q(sender_user_id = receiver_id), Q(sender_seller_id=payload['user_id']) | Q(sender_seller_id=payload['user_id']))
                    serializer = ChatSerializer(chat_data, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                if receiver_role == 'guide':
                    chat_data = chat.objects.filter(Q(receiver_user_id=receiver_id) | Q(sender_user_id = receiver_id), Q(sender_guide_id=payload['user_id']) | Q(sender_guide_id=payload['user_id']))
                    serializer = ChatSerializer(chat_data, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            if payload['role'] == 'guide':
                if receiver_role == 'user':
                    chat_data = chat.objects.filter(Q(receiver_user_id=receiver_id) | Q(sender_user_id = receiver_id), Q(sender_guide_id=payload['user_id']) | Q(sender_guide_id=payload['user_id']))
                    serializer = ChatSerializer(chat_data, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'message': 'error'}, status=status.HTTP_401_UNAUTHORIZED)