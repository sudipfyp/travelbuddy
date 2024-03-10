from django.urls import path
from .views import GuideHireView, GuideHireProposal, GuideHireProposalAccept

urlpatterns = [
    path('hire/<int:id>/',GuideHireView.as_view()), #here id means the id of the guide that I want to hire as a user
    path('hire/list/',GuideHireProposal.as_view()), #show the hiring proposal for the logged in worker
    path('hire/accept/<int:id>/',GuideHireProposalAccept.as_view()), #accept the hire req.. id means the proposal id
]
