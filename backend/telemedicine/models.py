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

# Model for reports objects TODO
class reports(models.Model):
    results = models.TextField()
    documents = models.FileField(storage=documentStorage)


# Model for inbox TODO ask about what needs to be shown



# Model for account information TODO ask what needs to be shown


# Model for authentication TODO look into different auth/encrypt methods in Django Docs 
