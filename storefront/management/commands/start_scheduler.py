from django.core.management.base import BaseCommand
from storefront.scheduler import start_scheduler

class Command(BaseCommand):
    help = 'Start the scheduler'

    def handle(self, *args, **options):
        start_scheduler()
        self.stdout.write(self.style.SUCCESS('Scheduler started.'))
