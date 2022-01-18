from rest_framework.views import APIView
from rest_framework.response import Response

from . import serializers
from . import models


class PatientView(APIView):
    def get(self, request):
        """List all patients"""
        user = request.user
        try:
            patients = models.Patient.objects.all()
            serializer = serializers.PatientSerializer(patients, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Exception": str(e)})
