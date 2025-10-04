import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.triggers.interval import IntervalTrigger
from django_apscheduler.jobstores import DjangoJobStore, register_events
from datetime import timedelta
from django.utils import timezone
from camper.models import Booking
import portalocker
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

LOCK_FILE = 'scheduler.lock'

def cleanup_bookings():
    with portalocker.Lock(LOCK_FILE, timeout=10):
        cutoff_time = timezone.now() - timedelta(minutes=15)
        logger.info(f"Running cleanup_bookings. Cutoff time: {cutoff_time}")

        bookings_to_delete = Booking.objects.filter(
            created_at__lt=cutoff_time, 
            is_active=False, 
            is_confirmed=False
        )
        deleted_count = bookings_to_delete.delete()
        logger.info(f"Deleted {deleted_count[0]} bookings")

executors = {
    'default': ThreadPoolExecutor(20),
}

scheduler = BackgroundScheduler(executors=executors)
scheduler.add_jobstore(DjangoJobStore(), "default")

scheduler.add_job(
    cleanup_bookings,
    trigger=IntervalTrigger(minutes=7),
    id="cleanup_bookings", 
    replace_existing=True,
)

register_events(scheduler)

def start_scheduler():
    if not scheduler.running:
        scheduler.start()
        logger.info("Scheduler started...")
    else:
        logger.info("Scheduler is already running.")
