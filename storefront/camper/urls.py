from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('choose/', views.choose_calendar, name='choose_calendar'),
    path('calendar/<str:calendar_type>/', views.calendar_view, name='calendar'),
    path('calendar/<str:calendar_type>/<int:year>/<int:month>/', views.calendar_view, name='calendar'),
    path('book_range/<str:calendar_type>/<str:start_date>/<str:end_date>/', views.book_range_view, name='book_range'),
    path('unbook_all/<str:calendar_type>/', views.unbook_all_view, name='unbook_all'),
    path('confirm-all-bookings/<str:calendar_type>/', views.confirm_all_bookings, name='confirm_all_bookings'),
    path('booking-success/', views.booking_success, name='booking_success'),
    path('booking-already-confirmed/', views.booking_already_confirmed, name='booking_already_confirmed'),
    path('contacts/', views.contact, name='contact'),
]
