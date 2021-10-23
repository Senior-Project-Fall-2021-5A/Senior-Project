from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import customUser 
 
class CustomUserCreationForm(UserCreationForm):    
    class Meta:        
        model = customUser        
        fields = ('email', 'is_staff')  
class CustomUserChangeForm(UserChangeForm):    
    class Meta:        
        model = customUser        
        fields = UserChangeForm.Meta.fields