from django.core.files.storage import FileSystemStorage
from django.db import models

documentStorage = FileSystemStorage('../storage/documents')

# Model for appointments objects TODO
class appointments(models.Model):
    date = models.DateField()
    time = models.TimeField()
    location = models.TextField() 
    details = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.date

# Model for reports objects TODO
class reports(models.Model):
    results = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.results


# Model for inbox TODO ask about what needs to be shown



# Model for account information TODO ask what needs to be shown
class account(models.Model):
    firstname = models.TextField()
    lastname = models.TextField()
    DoB = models. DateField()
    address = models.TextField()
    primarydoctor = models.TextField()
    primarylocation = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.DoB

# Model for authentication TODO look into different auth/encrypt methods in Django Docs 
