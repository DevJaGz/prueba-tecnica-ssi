from rest_framework import serializers
from . import models


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Patient
        fields = "__all__"


class PathologySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Pathology
        fields = "__all__"
