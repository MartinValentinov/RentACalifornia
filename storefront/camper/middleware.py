from django.utils.deprecation import MiddlewareMixin
from storefront.scheduler.scheduler import start_scheduler

class SchedulerMiddleware(MiddlewareMixin):
    initialized = False

    def process_request(self, request):
        if not self.initialized:
            start_scheduler()
            self.initialized = True
