from django.urls import path
from .views import HotelAddView, HotelDeleteView, HotelDetailView, HotelEditView, HotelListView

urlpatterns = [
    path('add', HotelAddView.as_view()),
    path('delete/<int:id>', HotelDeleteView.as_view()),
    path('detail/<int:id>', HotelDetailView.as_view()),
    path('edit/<int:id>', HotelEditView.as_view()),
    path('list', HotelListView.as_view()),

]
