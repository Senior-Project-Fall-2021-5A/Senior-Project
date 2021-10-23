from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .models import customUser, doctorProfile, paitientProfile, appointments, inbox, reports, insurance, location, notification

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = customUser
        fields = ('email', 'is_staff')

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