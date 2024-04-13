from django.urls import path
from .views import StopPointAddView, StopPointDeleteView, StopPointListView, TransportationAddView, TransportationListView, TransportationDeleteView, TransportationEditView, StopPointEditView 

urlpatterns = [
    path('transportation/add', TransportationAddView.as_view()),
    path('stoppoint/add', StopPointAddView.as_view()),
    path('transportation/list', TransportationListView.as_view()),
    path('stoppoint/list/<int:id>', StopPointListView.as_view()),
    path('transportation/delete/<int:id>', TransportationDeleteView.as_view()),
    path('stoppoint/delete/<int:id>', StopPointDeleteView.as_view()),
    path('stoppoint/edit/<int:id>', StopPointEditView.as_view()),
    path('transportation/edit/<int:id>', TransportationEditView.as_view()),
]
 