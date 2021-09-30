from django.contrib import admin
from .models import account, appointments, reports

class appointmentsAdmin(admin.ModelAdmin):
    list_display = ('patient_name', 'doctor_name', 'date','time','location','doctors_notes','reports')

class reportsAdmin(admin.ModelAdmin):
    list_display = ('results','documents')

class accountAdmin(admin.ModelAdmin):
    list_display= ('first_name','last_name','DoB','address','primary_doctor','primary_location','documents')


admin.site.register(appointments, appointmentsAdmin)
admin.site.register(reports, reportsAdmin)
admin.site.register(account, accountAdmin)


# test 
