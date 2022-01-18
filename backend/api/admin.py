from django.contrib import admin
from .models import Pathology, Patient

# Register your models here.
admin.site.register(Patient)
admin.site.register(Pathology)
