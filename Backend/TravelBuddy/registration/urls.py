from django.urls import path
from .views import AdminRegisteration, UserRegistration, GuideRegistration, SellerRegistration, loginUser, profileView, UserCheck, LogoutView, GuideDataView, GuideDetailView, ProfileView, UserList, GuideList, SellerList, CompleteGuideRegistration, CompleteSellerRegistration
from .views import CodeVerification, ResendCode, EditProfile, passwordChange, passwordReset, NoOfUsers, NoOfGuides, NoOfSellers
urlpatterns = [
    path('adminregister', AdminRegisteration.as_view()),
    path('userregister', UserRegistration.as_view()),
    path('guideregister', GuideRegistration.as_view()),
    path('sellerregister', SellerRegistration.as_view()),
    path('login', loginUser.as_view()),
    path('profile', ProfileView.as_view()),
    path('usercheck', UserCheck.as_view()),
    path('logout', LogoutView.as_view()),
    path('guide/list', GuideDataView.as_view()),
    path('guide/detail/<int:id>', GuideDetailView.as_view()),
    path('guide-list', GuideList.as_view()),
    path('seller-list', SellerList.as_view()),
    path('user-list', UserList.as_view()),
    path('complete/guide', CompleteGuideRegistration.as_view()),
    path('complete/seller', CompleteSellerRegistration.as_view()),
    path('code/verify', CodeVerification.as_view()),
    path('code/resend', ResendCode.as_view()),
    path('edit/profile', EditProfile.as_view()),
    path('password/change', passwordChange.as_view()),
    path('password/reset', passwordReset.as_view()),
    path('countusers', NoOfUsers.as_view()),
    path('countguides', NoOfGuides.as_view()),
    path('countsellers', NoOfSellers.as_view())

]
