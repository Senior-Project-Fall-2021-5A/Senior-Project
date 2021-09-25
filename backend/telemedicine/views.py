from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer, ReportsSerializer, AppointmentsSerializer
from .models import account, reports, appointments


class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = account.objects.all()

class ReportsView(viewsets.ModelViewSet):
    serializer_class = ReportsSerializer
    queryset = reports.objects.all()

class AppointmentsView(viewsets.ModelViewSet):
    serializer_class = AppointmentsSerializer
    queryset = appointments.objects.all()
