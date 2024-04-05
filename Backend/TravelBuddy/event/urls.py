from django.urls import path
from .views import EventAddView, EventDeleteView, EventDetailView, EventListView, EventUpdateView, CurrentEvent, UpcommingEvent, PastEvent
urlpatterns = [
    path('add', EventAddView.as_view()),
    path('current-event', CurrentEvent.as_view()),
    path('delete/<int:id>', EventDeleteView.as_view()),
    path('detail/<int:id>', EventDetailView.as_view()),
    path('list', EventListView.as_view()),
    path('update/<int:id>', EventUpdateView.as_view()),
    path('upcomming-event', UpcommingEvent.as_view()),
    path('past-event', PastEvent.as_view()),
]
