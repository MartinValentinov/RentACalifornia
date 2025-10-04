from django.contrib import admin
from .models import Booking

class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'calendar_type', 'is_active')
    list_filter = ('is_active', 'calendar_type')
    actions = ['make_active', 'make_inactive']

    @admin.action(description='Mark selected bookings as active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)

    @admin.action(description='Mark selected bookings as inactive')
    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)

admin.site.register(Booking, BookingAdmin)
