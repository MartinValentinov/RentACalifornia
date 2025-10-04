from django.core.management.base import BaseCommand
from django.utils.timezone import now
from datetime import timedelta
from camper.models import Booking

class Command(BaseCommand):
    help = 'Cleanup inactive bookings that are not confirmed within 15 minutes.'

    def handle(self, *args, **options):
        try:
            cutoff_time = now() - timedelta(minutes=15)
            Booking.objects.filter(created_at__lt=cutoff_time, is_active=True).update(is_active=False)
            self.stdout.write(self.style.SUCCESS('Successfully cleaned up inactive bookings.'))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f'Error: {e}'))