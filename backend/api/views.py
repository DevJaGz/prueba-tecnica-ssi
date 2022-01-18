from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models


class PatientView(APIView):
    def get(self, request):
        """List all patients"""
        try:
            patients = models.Patient.objects.all()
            serializer = serializers.PatientSerializer(patients, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Exception": str(e)})


class PathologyView(APIView):
    def post(self, request):
        """List Pathology by Patient"""
        try:
            pathologies = []
            pathologiesId = request.data.get("pathologiesId", None)
            if pathologiesId:
                for pathologyId in pathologiesId:
                    pathology = models.Pathology.objects.filter(id=pathologyId)
                    if pathology:
                        serializer = serializers.PathologySerializer(pathology, many=True)
                        pathologies.append(serializer.data[0])
                return Response(pathologies)
            return Response(status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"Exception": str(e)})
