from django.db import models
import uuid


class Pathology(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Patient(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    documentType = models.CharField(max_length=150)
    documentId = models.IntegerField()
    firstName = models.CharField(max_length=150)
    secondName = models.CharField(max_length=150)
    firstSurname = models.CharField(max_length=150)
    secondSurname = models.CharField(max_length=150)
    pathologies = models.ManyToManyField(Pathology)

    def __str__(self):
        return self.firstName