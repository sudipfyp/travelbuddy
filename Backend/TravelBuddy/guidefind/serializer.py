from rest_framework import serializers
from .models import GuideRequirement,GuideRequirementHiring
from registration.serializer import UserModelSerializer, GuideDataModelSerializer

class GuideRequirementAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideRequirement
        fields = [ 'title', 'description', 'location', 'date', 'status', 'budget']
    
class GuideRequirementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideRequirement
        fields = "__all__"
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        
        if request and request.method == "GET":
            fields['user'] = UserModelSerializer()
        
        return fields

class GuideHiringModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideRequirementHiring
        fields = "__all__"

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        
        if request and request.method == "GET":
            fields['guide'] = GuideDataModelSerializer()
            fields['guidereq'] = GuideRequirementModelSerializer()
        
        return fields

class GuideHiringAddModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideRequirementHiring
        fields = ['price']
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        
        if request and request.method == "GET":
            fields['guide'] = GuideDataModelSerializer()
            fields['guidereq'] = GuideRequirementModelSerializer()
        
        return fields