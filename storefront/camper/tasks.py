from datetime import timedelta
from django.utils.timezone import now
from .models import Booking

def cleanup_bookings():
    cutoff_time = now() - timedelta(minutes=15)
    Booking.objects.filter(created_at__lt=cutoff_time, is_active=True).update(is_active=False)
    print('Successfully cleaned up inactive bookings.')