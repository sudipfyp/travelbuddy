from django.urls import path
from .views import Rate, RateGuideHire

urlpatterns = [
    path('req/<int:id>', Rate.as_view()), #this is for the worker who found work from guide requirement
    path('hire/<int:id>', RateGuideHire.as_view()), #this is for the worker who found work from guider hire
]
