from rest_framework import serializers
from .models import account, reports, appointments

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = account
        fields = ('id', 'firstname', 'lastname', 'DoB', 'address', 'primarydoctor', 'primarylocation', 'documents')

class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model: reports
        fields = ('results', 'documents')

class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model: appointments
        fields = ('firstname', 'lastname', 'DoB', 'address', 'primarydoctor', 'primarylocation','documents')