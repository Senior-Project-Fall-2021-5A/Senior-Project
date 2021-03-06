from django.core.files.storage import FileSystemStorage
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

documentStorage = FileSystemStorage('../storage/documents')

# Model for user TODO ask what needs to be shown


class customUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(('email address'), unique=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

# Model for doctor TODO ask what needs to be shown


class doctorProfile(models.Model):
    userGUID = models.UUIDField()
    doctorProfileUID = models.UUIDField()
    first_name = models.TextField()
    mid_name = models.TextField()
    last_name = models.TextField()
    DoB = models. DateField()
    address1 = models.TextField()
    address2 = models.TextField()
    city = models.TextField()
    state = models.TextField()
    zip = models.TextField()
    idnum = models.TextField()
    email = models.EmailField()
    phone1 = models.TextField()
    phone2 = models.TextField()
    phone3 = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def __str__(self):
        return self.doctorProfileUID


class paitientProfile (models.Model):
    userGUID = models.UUIDField()
    paitientProfileUID = models.UUIDField()
    first_name = models.TextField()
    mid_name = models.TextField()
    last_name = models.TextField()
    DoB = models. DateField()
    address1 = models.TextField()
    address2 = models.TextField()
    city = models.TextField()
    state = models.TextField()
    zip = models.TextField()
    idnum = models.TextField()
    email = models.EmailField()
    phone1 = models.TextField()
    phone2 = models.TextField()
    phone3 = models.TextField()
    Insurance01UID = models.TextField()
    Insurance02UID = models.TextField()
    Insurance03UID = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.paitientProfileUID
# Model for demograhpic TODO ask what needs to be shown


# Model for appointment TODO ask what needs to be shown
class appointments(models.Model):
    appointmentUID = models.UUIDField()
    paitientProfileUID = models.UUIDField()
    doctorProfileUID = models.UUIDField()
    date = models.DateField()
    time = models.TimeField()
    locationUID = models.UUIDField()
    doctors_notes = models.TextField()
    reports = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.appointmentUID


# Model for inbox TODO ask what needs to be shown
class inbox(models.Model):
    inboxUID = models.UUIDField()
    userGUID = models.UUIDField()
    toDemoUID = models.UUIDField()
    subject = models.CharField(
        help_text="subject", max_length=200)
    body = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    documents = models.FileField(storage=documentStorage)
    isRead = models.BooleanField()

    def __str__(self):
        return self.inboxUID

# Model for reports TODO ask what needs to be shown


class reports(models.Model):
    reportUID = models.UUIDField()
    appointmentUID = models.UUIDField()
    date = models.DateField()
    time = models.TimeField()
    details = models.TextField()
    documents = models.FileField(storage=documentStorage)

    def _str_(self):
        return self.reportUID

# Model for insurance TODO ask what needs to be shown


class insurance(models.Model):
    insuranceUID = models.UUIDField()
    name = models.CharField(
        help_text="address", max_length=200)
    accountid = models.CharField(
        help_text="address", max_length=200)
    insuranceType = models.IntegerField()

    def __str__(self):
        return self.insuranceUID

# Model for location TODO ask what needs to be shown


class location(models.Model):
    locationUID = models.UUIDField()
    name = models.TextField(
        help_text="name place", max_length=200)
    address1 = models.TextField(
        help_text="address", max_length=200)
    address2 = models.TextField(
        help_text="address", max_length=200)
    city = models.CharField(
        help_text="address", max_length=200)
    State = models.CharField(
        help_text="address", max_length=200)
    zip = models.CharField(
        help_text="address", max_length=200)

    def __str__(self):
        return self.locationUID

# Model for notifications TODO ask what needs to be shown


class notification(models.Model):
    notificationUID = models.UUIDField()
    appointmentUID = models.UUIDField()
    reportUID = models.UUIDField()
    inboxUID = models.UUIDField()
    messages = models.CharField(
        help_text="reminder", max_length=200)
    link = models.URLField()
    date = models.DateField()
    time = models.TimeField()
    doEmail = models.BooleanField()

    def __str__(self):
        return self.notificationUID


# Model for authentication TODO look into different auth/encrypt methods in Django Docs
