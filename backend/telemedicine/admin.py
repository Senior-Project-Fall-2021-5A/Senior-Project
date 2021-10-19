from os import lseek
from django.contrib import admin
from .models import user, appointments, reports, doctorProfile, paitientProfile, inbox, insurance, notification, location

"""

class appointmentsAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'doctor_name', 'date','time','location','doctors_notes','reports')

class reportsAdmin(admin.ModelAdmin):
    list_display = ('results','documents')

class accountAdmin(admin.ModelAdmin):
    list_display= ('first_name','last_name','DoB','address','primary_doctor','primary_location','documents')


admin.site.register(appointments, appointmentsAdmin)
admin.site.register(reports, reportsAdmin)
admin.site.register(account, accountAdmin)

"""


class userAdmin(admin.ModelAdmin):
    list_display = ('userGUID', 'type', 'userName', 'password')


class doctorProfileAdmin(admin.ModelAdmin):
    list_display = ('userGUID', 'doctorProfileUID', 'first_name', 'last_name', 'DoB', 'address1', 'address2',
                    'city', 'state', 'zip', 'idnum', 'email', 'phone1', 'phone2', 'phone3', 'documents')


class paitientProfileAdmin(admin.ModelAdmin):
    list_display = ('userGUID', 'paitientProfileUID', 'first_name', 'last_name', 'DoB', 'address1', 'address2',
                    'city', 'state', 'zip', 'idnum', 'email', 'phone1', 'phone2', 'phone3', 'Insurance01UID', 'Insurance02UID', 'Insurance03UID', 'documents')


class appointmentsAdmin(admin.ModelAdmin):
    list_display = ('appointmentUID', 'paitientProfileUID', 'doctorProfileUID',
                    'date', 'time', 'locationUID', 'doctors_notes', 'reports')


class inboxAdmin(admin.ModelAdmin):
    list_display = ('inboxUID', 'userGUID', 'toDemoUID', 'subject',
                    'body', 'date', 'time', 'documents', 'isRead')


class reportsAdmin(admin.ModelAdmin):
    list_display = ('reportUID', 'appointmentUID', 'date',
                    'time', 'details', 'documents')


class insuranceAdmin(admin.ModelAdmin):
    list_display = ('insuranceUID', 'name', 'accountid', 'insuranceType')


class locationAdmin(admin.ModelAdmin):
    list_display = ('locationUID', 'name', 'address1',
                    'address2', 'city', 'State', 'zip')


class notificationAdmin(admin.ModelAdmin):
    list_display = ('notificationUID', 'appointmentUID', 'reportUID',
                    'inboxUID', 'messages', 'link', 'date', 'time', 'doEmail')


admin.site.register(user, userAdmin)
admin.site.register(doctorProfile, doctorProfileAdmin)
admin.site.register(paitientProfile, paitientProfileAdmin)
admin.site.register(appointments, appointmentsAdmin)
admin.site.register(inbox, inboxAdmin)
admin.site.register(reports, reportsAdmin)
admin.site.register(insurance, insuranceAdmin)
admin.site.register(location, locationAdmin)
admin.site.register(notification, notificationAdmin)

# test
