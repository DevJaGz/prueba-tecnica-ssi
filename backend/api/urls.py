from django.urls import path
from . import views

urlpatterns = [
    path("patients", views.PatientView.as_view()),
    path("pathologies", views.PathologyView.as_view()),
]
