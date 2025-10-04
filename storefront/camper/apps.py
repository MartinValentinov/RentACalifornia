from django.apps import AppConfig
import threading
import time
import sys

class CamperConfig(AppConfig):
    name = 'camper'

    def ready(self):
        if 'runserver' in sys.argv:
            def start_scheduler_with_delay():
                time.sleep(10)
                from storefront.scheduler.scheduler import start_scheduler
                start_scheduler()

            threading.Thread(target=start_scheduler_with_delay).start()
