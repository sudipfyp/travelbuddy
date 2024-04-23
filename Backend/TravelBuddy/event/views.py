from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import EventSerializer
from .models import Event
from registration.utils import verify_access_token
from django.utils import timezone

# Create your views here.
class EventAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "admin": 
                serailizer = EventSerializer(data=request.data)
                if serailizer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    start = request.data.get('startdate')
                    end = request.data.get('enddate')
                    location = request.data.get('location')
                    tag = request.data.get('tag')
                    image = request.data.get('image')

                    Event.objects.create(name=name, description=description, startdate=start, enddate = end, location=location, tag=tag, image=image)

                    return Response({"msg": "Event Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class EventUpdateView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "admin":
                EventObject = Event.objects.filter(id=kwargs['id'])
                eventgetobj = Event.objects.get(id=kwargs['id'])
                if len(EventObject) == 0:
                    return Response({"msg": "Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = EventSerializer(data=request.data)
                if serializer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    start = request.data.get('startdate')
                    end = request.data.get('enddate')
                    location = request.data.get('location')
                    tag = request.data.get('tag')
                    image = request.FILES.get('image')

                    EventObject.update(name=name, description=description, startdate=start, enddate = end, location=location, tag=tag)
                    if image:
                        eventgetobj.image = image
                        eventgetobj.save()
                    return Response({"msg": "Event Updated Successfully"}, status=status.HTTP_200_OK)
                    


                    return Response({"msg": "Event Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class EventDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "admin":
                EventObject = Event.objects.filter(id=kwargs['id'])
                if len(EventObject) == 0:
                    return Response({"msg": "Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
                EventObject.delete()
                return Response({"msg": "Event Deleted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)

class EventDetailView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            EventObject = Event.objects.filter(id=kwargs['id'])
            if len(EventObject) == 0:
                return Response({"msg": "Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = EventSerializer(EventObject, many=True, context={"request": self.request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"msg": "Event Not Found"}, status=status.HTTP_404_NOT_FOUND)

class EventListView(APIView):
    def get(self, request):
        EventDataObject = Event.objects.all()
        if len(EventDataObject) == 0:
            return Response({"msg": "Event Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(EventDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CurrentEvent(APIView):
    def get(self, request):
        current_date = timezone.now().date()
        active_events = Event.objects.filter(startdate__lte=current_date, enddate__gte=current_date)
        
        if len(active_events) == 0:
            return Response({"msg": "There are no current events"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(active_events, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpcommingEvent(APIView):
    def get(self, request):
        current_date = timezone.now().date()
        upcomming_events = Event.objects.filter(startdate__gt=current_date)
        
        if len(upcomming_events) == 0:
            return Response({"msg": "There are no upcomming events"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(upcomming_events, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PastEvent(APIView):
    def get(self, request):
        current_date = timezone.now().date()
        threshold_date = current_date - timezone.timedelta(days=30)
        past_events = Event.objects.filter(enddate__gte=threshold_date, enddate__lt=current_date)
        
        if len(past_events) == 0:
            return Response({"msg": "There are no past events"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(past_events, many=True, context={"request": self.request})

        return Response(serializer.data, status=status.HTTP_200_OK)