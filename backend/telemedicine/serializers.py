from rest_framework import serializers
from .models import account, reports, appointments

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = account
        fields = ('id', 'first_name', 'last_name', 'DoB', 'address', 'primary_doctor', 'primary_location', 'documents')

class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = reports
        fields = ('id', 'results', 'documents')

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = appointments
        fields = ('id', 'patient_name', 'date', 'time', 'location', 'details','documents')