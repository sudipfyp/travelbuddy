from rest_framework import serializers
from .models import Transportation, StopPoint

class TransportationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transportation
        fields = "__all__"

class StopPointModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StopPoint
        fields = "__all__"
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and request.method == "GET":
            fields['transportation'] = TransportationModelSerializer()
        return fields