from rest_framework import serializers
from .models import chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = chat
        fields = "__all__"

