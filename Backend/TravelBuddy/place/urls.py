from django.urls import path
from .views import PlaceAddView, PlaceEditView, PlaceDetailView, PlaceDeleteView, PlaceListView, Recommendation

urlpatterns = [
    path('add/', PlaceAddView.as_view()),
    path('delete/<int:id>/', PlaceDeleteView.as_view()),
    path('detail/<int:id>/', PlaceDetailView.as_view()),
    path('edit/<int:id>/', PlaceEditView.as_view()),
    path('list/', PlaceListView.as_view()),
    path('recommendation', Recommendation.as_view())
]
