from django.urls import path
from .views import GuideRequirementAdd, GuideRequirementDelete, GuideRequirementEdit, GuideRequirementListView, GuideRequirementDetailView, GuideRequestApply, ProposalList, GuideRequestAccept, GuideRequestReject,GuideRequirementListViewFilter
from .views import CurrentGuideRequirementWorker,CurrentWorkerListView,UserTotalCurrentJob,GuideTotalCurrentJob
urlpatterns = [
    path('add',GuideRequirementAdd.as_view()),
    path('delete/<int:id>',GuideRequirementDelete.as_view()),
    path('edit/<int:id>',GuideRequirementEdit.as_view()),
    path('list',GuideRequirementListView.as_view()),
    path('detail/<int:id>',GuideRequirementDetailView.as_view()),
    path('apply/<int:id>',GuideRequestApply.as_view()),
    path('job/list/<int:id>',ProposalList.as_view()),
    path('job/accept/<int:id>',GuideRequestAccept.as_view()),
    path('job/reject/<int:id>',GuideRequestReject.as_view()),
    path('job/list/user',GuideRequirementListViewFilter.as_view()),
    path('job/current/worker/<int:id>',CurrentGuideRequirementWorker.as_view()), #id is the id of the job requirement
    path('job/current/guide/',CurrentWorkerListView.as_view()), #id is the id of the job requirement
    path('user/total/current/job',UserTotalCurrentJob.as_view()), #id is the id of the job requirement
    path('guide/total/current/job',GuideTotalCurrentJob.as_view()), #id is the id of the job requirement

]
