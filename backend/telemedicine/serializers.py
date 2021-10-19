from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .models import user, doctorProfile, paitientProfile, appointments, inbox, reports, insurance, location, notification
'''
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
        fields = ('id', 'patient_name', 'doctor_name', 'date', 'time', 'location', 'doctors_notes','reports')
'''

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('userGUID', 'type', 'userName', 'password')

class doctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = doctorProfile
        fields =('userGUID', 'doctorProfileUID', 'first_name', 'last_name', 'DoB', 'address1', 'address2', 
                    'city', 'state', 'zip', 'idnum', 'email', 'phone1', 'phone2', 'phone3', 'documents')

class paitientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = paitientProfile
        fields = ('userGUID', 'paitientProfileUID', 'first_name', 'last_name', 'DoB', 'address1', 'address2', 
                    'city', 'state', 'zip', 'idnum', 'email', 'phone1', 'phone2', 'phone3','Insurance01UID', 'Insurance02UID', 'Insurance03UID', 'documents')

class appointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = appointments
        fields =('appointmentUID', 'paitientProfileUID', 'doctorProfileUID', 'date', 'time', 'locationUID', 'doctors_notes', 'reports')

class inboxSerializer(serializers.ModelSerializer):
    class Meta:
        model = inbox
        fields = ('inboxUID', 'userGUID', 'toDemoUID', 'subject', 'body', 'date', 'time', 'documents', 'isRead')

class reportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = reports
        fields = ('reportUID', 'appointmentUID', 'date', 'time', 'details', 'documents')

class insuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = insurance
        fields = ('insuranceUID', 'name', 'accountid', 'insuranceType')

class locationSerializer(serializers.ModelSerializer):
    class Meta:
        model = location
        fields = ('locationUID', 'name', 'address1', 'address2', 'city', 'State', 'zip')

class notificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = notification
        fields = ('notificationUID', 'appointmentUID', 'reportUID', 'inboxUID', 'messages', 'link', 'date', 'time', 'doEmail')