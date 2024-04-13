from django.urls import path, include
from .views import *

urlpatterns = [
    path('add', ShopAddView.as_view()),
    path('edit/<int:id>', ShopEditView.as_view()),
    path('delete/<int:id>', ShopDeleteView.as_view()),
    path('detail/<int:id>', ShopDetailView.as_view()),#detail of shop for owner
    path('detailall/<int:id>', ShopDetailAllView.as_view()),#detail of shop for all (owner and customer}
    path('list', ShopListView.as_view()),#list all shops
    path('product/add/<int:id>', ProductAddView.as_view()),
    path('product/edit/<int:id>', ProductEdit.as_view()),
    path('product/list/<int:id>', ProductListView.as_view()),#list all products of a shop for owner
    path('product/delete/<int:id>', ProductDeleteView.as_view()),
    path('product/detail/<int:id>', ProductDetailView.as_view()),
    path('product/listall', ProductListAllView.as_view())#list all products of all shops
]
