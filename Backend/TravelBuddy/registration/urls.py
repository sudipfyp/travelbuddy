from django.urls import path
from .views import UserRegistration, GuideRegistration, SellerRegistration, loginUser, loginGuide, loginSeller, profileView

urlpatterns = [
    path('userregister', UserRegistration.as_view()),
    path('guideregister', GuideRegistration.as_view()),
    path('sellerregister', SellerRegistration.as_view()),
    path('userlogin', loginUser.as_view()),
    path('guidelogin', loginGuide.as_view()),
    path('sellerlogin', loginSeller.as_view()),
    path('profile', profileView.as_view())

]
