from django.urls import path, include
from .views import ShopAddView, ShopEditView

urlpatterns = [
    path('add/', ShopAddView.as_view()),
    path('edit/<int:id>', ShopEditView.as_view()),
]
