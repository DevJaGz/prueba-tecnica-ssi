from django.urls import path
from . import views

urlpatterns = [
    path("", views.apiOverView),
    path("patient-list/", views.getPatientsView),
    path("patient-create/", views.createPatientView),
    path("patient-detail/<uuid:pk>/", views.detailPatientView),
    path("patient-update/<uuid:pk>/", views.updatePatientView),
    path("patient-delete/<uuid:pk>/", views.deletePatientView),
    path("pathology-list/", views.getPathologiesView),
    path("pathology-create/", views.createPathologyView),
    path("pathology-update/<uuid:pk>/", views.updatePathology),
    path("pathology-delete/<uuid:pk>/", views.deletePathology),
]
