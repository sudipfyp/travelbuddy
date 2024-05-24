from rest_framework import serializers
from .models import chat
from registration.serializer import UserDataModelSerializer, GuideDataModelSerializer, SellerDataModelSerializer


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = chat
        fields = "__all__"

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request and request.method == "GET":
            fields['sender_guide'] = GuideDataModelSerializer()
            fields['sender_user'] = UserDataModelSerializer()
            fields['sender_seller'] = SellerDataModelSerializer()
            fields['receiver_guide'] = GuideDataModelSerializer()
            fields['receiver_user'] = UserDataModelSerializer()
            fields['receiver_seller'] = SellerDataModelSerializer()

        return fields

class ChatSerializers(serializers.ModelSerializer):
    class Meta:
        model = chat
        fields = "__all__"

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")

        if request and request.method == "POST":
            fields['sender_guide'] = GuideDataModelSerializer()
            fields['sender_user'] = UserDataModelSerializer()
            fields['sender_seller'] = SellerDataModelSerializer()
            fields['receiver_guide'] = GuideDataModelSerializer()
            fields['receiver_user'] = UserDataModelSerializer()
            fields['receiver_seller'] = SellerDataModelSerializer()

        return fields