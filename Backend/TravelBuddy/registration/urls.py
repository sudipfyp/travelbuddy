from django.urls import path
from .views import RegistrationUser, GuideRegistration, SellerRegistration

urlpatterns = [
    path('registerUser/', RegistrationUser.as_view()),
    path('registerGuide/', GuideRegistration.as_view()),
    path('registerSeller/', SellerRegistration.as_view()),
]
