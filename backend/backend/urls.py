"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from telemedicine import views

router = routers.DefaultRouter()
router.register(r'user', views.userView, 'user')
router.register(r'doctorProfile', views.doctorProfileView, 'doctorProfile')
router.register(r'paitientProfile', views.paitientProfileView, 'paitientProfile')
router.register(r'appointments', views.appointmentsView, 'appointments')
router.register(r'inbox', views.inboxView, 'inbox')
router.register(r'reports', views.reportsView, 'reports')
router.register(r'insurance', views.insuranceView, 'insurance')
router.register(r'location', views.locaionView, 'location')
router.register(r'notification', views.notificationView, 'notificatiion')




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
