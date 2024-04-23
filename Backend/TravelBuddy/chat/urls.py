from django.urls import path
from .views import chatApi, chatView

urlpatterns = [
    path('chat', chatApi.as_view()),
    path('chatview', chatView.as_view())
]
