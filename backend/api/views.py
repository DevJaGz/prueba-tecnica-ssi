from re import S
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models


""""---------------------"""
"""" --- Patient API --- """
""""---------------------"""


@api_view(["GET"])
def apiOverView(request):
    """Lists URLs Avaliable in the API"""

    api_urls = {
        "List Patients": "api/patient-list/",
        "Patien's details": "api/patient-detail/<uuid:pk>",
        "Create a Patient": "api/patient-create/",
        "Update a Patient": "api/patient-update/<uuid:pk>",
        "Delete a Patient": "api/patient-delete/<uuid:pk>",
        "List Pathologies": "api/pathology-list/",
        "Create a Pathology": "api/pathology-create/",
        "Update a Pathology": "api/pathology-update/<uuid:pk>",
        "Delete a Pathology": "api/pathology-delete/<uuid:pk>",
    }
    return Response(api_urls)


@api_view(["GET"])
def getPatientsView(request):
    """Sends all patients"""

    try:

        patients = models.Patient.objects.all()
        if patients:
            # serializer = serializers.PatientSerializer(patients, many=True)
            # return Response(serializer.data)
            serializer_patient = serializers.PatientSerializer(patients, many=True)
            for patient in serializer_patient.data:
                pathologies = []
                for pathologyId in patient["pathologies"]:
                    print("...", pathologyId)
                    pathology = models.Pathology.objects.get(id=pathologyId)
                    serializer_pathology = serializers.PathologySerializer(pathology, many=False)
                    pathologies.append(serializer_pathology.data)
                patient["pathologies"] = pathologies
            return Response(serializer_patient.data)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def createPatientView(request):
    """Creates new patient"""

    try:
        serializer = serializers.PatientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def detailPatientView(request, pk):
    """Sends a patient base on pk"""

    try:
        patient = models.Patient.objects.get(id=pk)
        if patient:
            serializer = serializers.PatientSerializer(patient, many=False)
            if serializer.is_valid:
                return Response(serializer.data)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
def updatePatientView(request, pk):
    """Update a patient base on pk"""

    try:
        patient = models.Patient.objects.get(id=pk)
        if patient:
            serializer = serializers.PatientSerializer(patient, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
def deletePatientView(request, pk):
    """Deletes a patient base on pk"""

    try:
        patient = models.Patient.objects.get(id=pk)
        if patient:
            patient.delete()
            serializer = serializers.PatientSerializer(patient, many=False)
            if serializer:
                return Response(serializer.data)
        return Response(status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


""""-----------------------"""
"""" --- Pathology API --- """
""""-----------------------"""


@api_view(["GET"])
def getPathologiesView(request):
    """Sends all Pathologies"""

    try:
        pathologies = models.Pathology.objects.all()
        if pathologies:
            serializer = serializers.PathologySerializer(pathologies, many=True)
            return Response(serializer.data)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def createPathologyView(request):
    """Create new pathology"""

    try:
        serializer = serializers.PathologySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
def updatePathology(request, pk):
    """Update a pathology base on pk"""

    try:
        pathology = models.Pathology.objects.get(id=pk)
        if pathology:
            serializer = serializers.PathologySerializer(pathology, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
def deletePathology(request, pk):
    """Delete a pathology base on pk"""

    try:
        pathology = models.Pathology.objects.get(id=pk)
        if pathology:
            pathology.delete()
            serializer = serializers.PathologySerializer(pathology, many=False)
            if serializer:
                return Response(serializer.data)
        return Response(status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"Exception": str(e)}, status.HTTP_500_INTERNAL_SERVER_ERROR)
