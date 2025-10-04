from django import forms
from .models import Booking
from django.core.validators import EmailValidator

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['date']

class ContactForm(forms.Form):
    name = forms.CharField(
        label='Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'Name'})
    )
    email = forms.EmailField(
        label='Email',
        widget=forms.EmailInput(attrs={'placeholder': 'Email'})
    )
    subject = forms.CharField(
        label='Subject',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'Subject'})
    )
    message = forms.CharField(
        label='Message',
        widget=forms.Textarea(attrs={'placeholder': 'Message', 'rows': 5})
    )