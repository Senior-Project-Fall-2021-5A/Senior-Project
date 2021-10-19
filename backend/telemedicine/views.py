from django.shortcuts import render
from rest_framework import viewsets
from .serializers import userSerializer, doctorProfileSerializer, paitientProfileSerializer, appointmentsSerializer, inboxSerializer, reportsSerializer, insuranceSerializer, locationSerializer, notificationSerializer
from .models import user, doctorProfile, paitientProfile, appointments, inbox, reports, insurance, location, notification

'''
class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = account.objects.all()

class ReportsView(viewsets.ModelViewSet):
    serializer_class = ReportsSerializer
    queryset = reports.objects.all()

class AppointmentsView(viewsets.ModelViewSet):
    serializer_class = AppointmentsSerializer
    queryset = appointments.objects.all()
'''

class userView(viewsets.ModelViewSet):
    serializer_class = userSerializer
    queryset = user.objects.all()

class doctorProfileView(viewsets.ModelViewSet):
    serializer_class = doctorProfileSerializer
    queryset = doctorProfile.objects.all()

class paitientProfileView(viewsets.ModelViewSet):
    serializer_class = paitientProfileSerializer
    queryset = paitientProfile.objects.all()

class appointmentsView(viewsets.ModelViewSet):
    serializer_class = appointmentsSerializer
    queryset = appointments.objects.all()

class inboxView(viewsets.ModelViewSet):
    serializer_class = inboxSerializer
    queryset = inbox.objects.all()

class reportsView(viewsets.ModelViewSet):
    serializer_class = reportsSerializer
    queryset = reports.objects.all()

class insuranceView(viewsets.ModelViewSet):
    serializer_class = insuranceSerializer
    queryset = insurance.objects.all()

class locaionView(viewsets.ModelViewSet):
    serializer_class = locationSerializer
    queryset = location.objects.all()

class notificationView(viewsets.ModelViewSet):
    serializer_class = notificationSerializer
    queryset = notification.objects.all()