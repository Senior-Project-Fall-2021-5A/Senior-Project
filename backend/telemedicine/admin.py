from django.contrib import admin
from .models import account, appointments, reports

class appointmentsAdmin(admin.ModelAdmin):
    list_display = ('date','time','location','details','documents')

class reportsAdmin(admin.ModelAdmin):
    list_display =('results','documents')

class accountAdmin(admin.ModelAdmin):
    list_display=('firstname','lastname','DoB','address','primarydoctor','primarylocation','documents')

admin.site.register(appointments, appointmentsAdmin)

admin.site.register(reports, reportsAdmin)

admin.site.register(account, accountAdmin)
# Register your models here.


# test 
