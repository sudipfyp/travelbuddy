from django.urls import path
from .views import HotelAddView, HotelDeleteView, HotelDetailView, HotelEditView, HotelListView, HotelRoomAddView, HotelRoomListView, HotelRoomBooking, HotelRoomAccept, HotelRoomReject,UserHotelRoomCancel

urlpatterns = [
    path('add', HotelAddView.as_view()),
    path('edit/<int:id>', HotelEditView.as_view()),
    path('delete/<int:id>', HotelDeleteView.as_view()),
    path('detail/<int:id>', HotelDetailView.as_view()),
    path('list', HotelListView.as_view()),
    path('room/add', HotelRoomAddView.as_view()),
    path('room/list/<int:id>', HotelRoomListView.as_view()),
    path('room/book/<int:id>', HotelRoomBooking.as_view()), #id is the room id
    path('room/accept/<int:id>', HotelRoomAccept.as_view()), #id refers to the booking id
    path('room/reject/<int:id>', HotelRoomReject.as_view()), #id refers to the booking id
    path('user/room/cancel/<int:id>', UserHotelRoomCancel.as_view()), #id refers to the booking id

]
