from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from .serializer import ShopModelSerializer, ProductModelSerializer
from .models import Shop, Product
from registration.utils import verify_access_token


# Create your views here.
class ShopAddView(APIView):
    def post(self, request):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                serailizer = ShopModelSerializer(data=request.data)
                if serailizer.is_valid():
                    name = request.data.get('name')
                    description = request.data.get('description')
                    latitude = request.data.get('latitude')
                    longitude = request.data.get('longitude')
                    address = request.data.get('address')
                    image = request.data.get('image')

                    Shop.objects.create(name=name, description=description, latitude=latitude, longitude=longitude,
                                        address=address, image=image, owner_id=payload['user_id'])

                    return Response({"msg": "Shop Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ShopEditView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller" or payload['role'].lower() == "admin":
                ShopObject = None

                if payload['role'].lower() == "seller":
                    ShopObject = Shop.objects.filter(
                        id=kwargs['id'], owner_id=payload['user_id'])

                elif payload['role'].lower() == "admin":
                    ShopObject = Shop.objects.filter(id=kwargs['id'])

                if len(ShopObject) == 0:
                    return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = ShopModelSerializer(data=request.data)

                if serializer.is_valid():
                    ShopObject.update(**serializer.validated_data)
                    return Response({"msg": "Shop Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'msg': 'Non Authorized user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ShopDetailView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        ShopObject = Shop.objects.filter(
            owner__id=payload['user_id']).select_related('owner')
        if len(ShopObject) == 0:
            return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShopModelSerializer(ShopObject, many=True, context={
                                         "request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ShopDetailAllView(APIView):
    def get(self, request, *args, **kwargs):
        ShopObject = Shop.objects.filter(
            id=kwargs['id']).select_related('owner')
        if len(ShopObject) == 0:
            return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShopModelSerializer(ShopObject, many=True, context={
                                         "request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ShopDeleteView(APIView):
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller" or payload['role'].lower() == "admin":
                ShopObject = None

                if payload['role'].lower() == "seller":
                    ShopObject = Shop.objects.filter(
                        id=kwargs['id'], owner_id=payload['user_id'])

                elif payload['role'].lower() == "admin":
                    ShopObject = Shop.objects.filter(id=kwargs['id'])

                if len(ShopObject) == 0:
                    return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
                ShopObject.delete()
                return Response({"msg": "Shop Deleted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Non Authorized user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ShopListView(APIView):
    def get(self, request):
        ShopDataObject = Shop.objects.all()
        if len(ShopDataObject) == 0:
            return Response({"msg": "Shop Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShopModelSerializer(ShopDataObject, many=True, context={
                                         "request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductAddView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                serailizer = ProductModelSerializer(data=request.data)
                if serailizer.is_valid():
                    shop = kwargs['id']
                    name = request.data.get('name')
                    description = request.data.get('description')
                    price = request.data.get('price')
                    image = request.data.get('image')
                    tag = request.data.get('tag')

                    Product.objects.create(
                        name=name, description=description, price=price, image=image, shop_id=shop, tag=tag)

                    return Response({"msg": "Product Registered Successfully"}, status=status.HTTP_200_OK)

                return Response(serailizer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ProductEdit(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                ProductObject = Product.objects.filter(id=kwargs['id'])
                if len(ProductObject) == 0:
                    return Response({"msg": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = ProductModelSerializer(data=request.data)
                if serializer.is_valid():
                    shop = kwargs['id']
                    name = request.data.get('name')
                    description = request.data.get('description')
                    price = request.data.get('price')
                    image = request.data.get('image')
                    tag = request.data.get('tag')

                    ProductObject.update(
                        name=name, description=description, price=price, image=image, shop_id=shop, tag=tag)
                    return Response({"msg": "Product Updated Successfully"}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ProductListView(APIView):
    def get(self, request, *args, **kwargs):
        shop = kwargs['id']
        ProductDataObject = Product.objects.filter(shop_id=shop)
        if len(ProductDataObject) == 0:
            return Response({"msg": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductModelSerializer(
            ProductDataObject, many=True, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDeleteView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get("token", None)
        verification, payload = verify_access_token(token)
        if verification:
            if payload['role'].lower() == "seller":
                ProductObject = Product.objects.filter(id=kwargs['id'])
                if len(ProductObject) == 0:
                    return Response({"msg": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
                ProductObject.delete()
                return Response({"msg": "Product Deleted Successfully"}, status=status.HTTP_200_OK)
            return Response({'msg': 'Only valid to specific user', }, status=status.HTTP_403_FORBIDDEN)
        return Response({'msg': 'Login First ', }, status=status.HTTP_403_FORBIDDEN)


class ProductListAllView(APIView):
    def get(self, request):
        ProductDataObject = Product.objects.all()
        if len(ProductDataObject) == 0:
            return Response({"msg": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductModelSerializer(ProductDataObject, many=True, context={
            "request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    def get(self, request, *args, **kwargs):
        ProductObject = Product.objects.filter(id=kwargs['id'])
        if len(ProductObject) == 0:
            return Response({"msg": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductModelSerializer(ProductObject, many=True, context={
            "request": self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)
