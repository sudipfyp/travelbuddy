from django.urls import path
from .views import GuideHireView, GuideHireProposal, GuideHireProposalAccept, GuideHireProposalReject, GuideHireCancel, CurrentGuideHire, pay, payverify

urlpatterns = [
    path('hire/<int:id>/',GuideHireView.as_view()), #here id means the id of the guide that I want to hire as a user
    path('hire/list/',GuideHireProposal.as_view()), #show the hiring proposal received for the logged in worker
    path('hire/current/',CurrentGuideHire.as_view()), #show the current hiring sent by logged in user
    path('hire/accept/<int:id>/',GuideHireProposalAccept.as_view()), #accept the hire req.. id means the proposal id
    path('hire/reject/<int:id>/',GuideHireProposalReject.as_view()), #reject the hire req.. id means the proposal id
    path('hire/cancel/<int:id>/',GuideHireCancel.as_view()), #cencel the hire req.. id means the proposal id
    path('pay',pay.as_view()),
    path('pay/<int:id>/<int:key>',payverify.as_view()), 
]
