from django.core.files.storage import FileSystemStorage
from django.db import models

documentStorage = FileSystemStorage('../storage/documents')

# Model for appointments objects TODO
class appointments(models.Model):
    patient_name = models.CharField(
        help_text="Patients full name",
        max_length=200)
    doctor_name = models.CharField(
        help_text="Doctors name",
        max_length=200)
    date = models.DateField()
    time = models.TimeField()
    location = models.TextField() 
    doctors_notes = models.TextField()
    reports = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.patient_name

# Model for reports objects TODO
class reports(models.Model):
    results = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.results


# Model for inbox TODO ask about what needs to be shown



# Model for account information TODO ask what needs to be shown
class account(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    DoB = models. DateField()
    address = models.TextField()
    primary_doctor = models.TextField()
    primary_location = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.DoB

# Model for authentication TODO look into different auth/encrypt methods in Django Docs 
