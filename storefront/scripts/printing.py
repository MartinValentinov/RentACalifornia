import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'storefront.settings')
django.setup()

from django.utils import timezone
from camper.models import Booking

# Fetch all bookings
bookings = Booking.objects.all()

# Print details of each booking
for booking in bookings:
    print(f"Booking ID: {booking.id}, User: {booking.user}, Created At: {booking.created_at}, Date: {booking.date}, Is Active: {booking.is_active}")
