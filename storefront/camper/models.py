from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.title
    
class Booking(models.Model):
    CALENDAR_CHOICES = [
        ('malibu', 'Calendar Malibu'),
        ('zuma', 'Calendar Zuma'),
    ]
    
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    calendar_type = models.CharField(max_length=10, choices=CALENDAR_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False)

    def confirm(self):
        self.is_active = True
        self.is_confirmed = True
        self.save()
    
    def __str__(self):
        return f"Booking ID: {self.id}, Active: {self.is_active}, Confirmed: {self.is_confirmed}"