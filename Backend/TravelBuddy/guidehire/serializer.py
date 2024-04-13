from rest_framework import serializers
from .models import GuideHire
from registration.serializer import UserModelSerializer, GuideModelSerializer

class GuideHireModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideHire
        fields = ['place', 'day', 'date']


class GuideHireViewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideHire
        fields = '__all__'

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        
        if request and request.method == "GET":
            fields['user'] = UserModelSerializer()
            fields['guide'] = GuideModelSerializer()
        
        return fields