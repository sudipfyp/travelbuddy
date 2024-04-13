from django.urls import path
from .views import Rate, RateGuideHire

urlpatterns = [
    path('rate/req/<int:id>', Rate.as_view()), #this is for the worker who found wokr from guider requirement
    path('rate/hire/<int:id>', RateGuideHire.as_view()), #this is for the worker who found wokr from guider hire
]
