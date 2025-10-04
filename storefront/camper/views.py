from datetime import date, datetime, timedelta
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Event, Booking
from .forms import BookingForm
import calendar
from django.utils import timezone
from django.utils.timezone import now
from .forms import ContactForm
from django.core.mail import EmailMessage

# Create your views here.
def home(request):
    return render(request, 'authentication/index.html')

def register(request):
    if request.method == "POST":
        username = request.POST['username']
        fname = request.POST['fname']
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered!")
            return redirect('register')
        
        if len(username) > 10:
            messages.error(request, "Username is too long!")
            return redirect('register')

        if pass1 != pass2:
            messages.error(request, "Passwords didn't match!")
            return redirect('register')

        if not username.isalnum():
            messages.error(request, "Username must be alpha-numeric!")
            return redirect('register')

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.save()

        user = authenticate(username=username, password=pass1)
        if user is not None:
            login(request, user)
            return redirect('home')  

    return render(request, 'authentication/register.html')

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']
        remember_me = request.POST.get('remember_me', False)

        user = authenticate(username=username, password=pass1)

        if user is not None:

            if remember_me:
                request.session.set_expiry(1209600)
            else:
                request.session.set_expiry(0)

            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Your Username Or Password Is Wrong")
            return redirect('login')
        
    return render(request, 'authentication/login.html')

def user_logout(request):
    logout(request)
    return redirect('home')

def choose_calendar(request):
    return render(request, 'choose_calendar.html')

@login_required(login_url='login')
def calendar_view(request, calendar_type, year=None, month=None):
    current_date = datetime.today()
    current_year = current_date.year
    current_month = current_date.month
    today = timezone.now().date()
    next_day = today + timedelta(days=1)

    if year is None or month is None:
        year = current_year
        month = current_month
    else:
        year = int(year)
        month = int(month)

    if year < current_year or (year == current_year and month < current_month):
        year = current_year
        month = current_month

    cal = calendar.Calendar(firstweekday=0).monthdayscalendar(year, month)
    events = Event.objects.filter(start_time__year=year, start_time__month=month)
    bookings = Booking.objects.filter(date__year=year, date__month=month, calendar_type=calendar_type)

    booked_days = [booking.date.day for booking in bookings]
    user_bookings = bookings.filter(user=request.user)
    user_booked_days = [booking.date.day for booking in user_bookings]
    bookings = Booking.objects.filter(date__year=year, date__month=month, calendar_type=calendar_type)    

    prev_year, prev_month = prev_months(year, month)
    next_year, next_month = next_months(year, month)

    context = {
        'calendar': cal,
        'events': events,
        'booked_days': booked_days,
        'current_year': current_year,
        'current_month': current_month,
        'display_year': year,
        'display_month': month,
        'prev_year': prev_year,
        'prev_month': prev_month,
        'next_year': next_year,
        'next_month': next_month,
        'user_booked_days': user_booked_days,
        'calendar_type': calendar_type,
        'user_bookings': user_bookings,
        'today': today,
        'next_day': next_day,
    }

    return render(request, 'calendar.html', context)

@login_required(login_url='login')
def book_range_view(request, calendar_type, start_date, end_date):
    try:
        start_date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
        today = timezone.now().date()

        if start_date_obj > end_date_obj:
            start_date_obj, end_date_obj = end_date_obj, start_date_obj

        if start_date_obj <= today or end_date_obj <= today:
            messages.error(request, "You cannot book past or current days.")
            return redirect('calendar', calendar_type=calendar_type, year=start_date_obj.year, month=start_date_obj.month)

        existing_bookings = Booking.objects.filter(
            date__range=(start_date_obj, end_date_obj),
            calendar_type=calendar_type,
            is_active=True
        )

        if existing_bookings.exists():
            messages.error(request, "Some of the selected dates are already booked.")
            return redirect('calendar', calendar_type=calendar_type, year=start_date_obj.year, month=start_date_obj.month)

        elif start_date_obj == end_date_obj:
            messages.error(request, "You cannot book less than 2 days.")
            return redirect('calendar', calendar_type=calendar_type, year=start_date_obj.year, month=start_date_obj.month)

        for n in range(int((end_date_obj - start_date_obj).days) + 1):
            date = start_date_obj + timedelta(n)
            if date > today:
                Booking.objects.create(user=request.user, date=date, calendar_type=calendar_type)

        messages.success(request, "Booked successfully! Pleace confirm in the next 15min")
    except Exception as e:
        messages.error(request, "Error booking dates: " + str(e))

    return redirect('calendar', calendar_type=calendar_type, year=start_date_obj.year, month=start_date_obj.month)

@login_required(login_url='login')
def unbook_all_view(request, calendar_type):
    if request.method == 'POST':
        try:
            Booking.objects.filter(user=request.user, calendar_type=calendar_type, is_active=False).delete()
            messages.success(request, "All your bookings have been canceled.")
        except Exception as e:
            messages.error(request, "Error unbooking all dates: " + str(e))
    else:
        messages.error(request, "Invalid request method.")
    return redirect('calendar', calendar_type=calendar_type)

def prev_months(year, month):
    if month == 1:
        return year - 1, 12
    else:
        return year, month - 1

def next_months(year, month):
    if month == 12:
        return year + 1, 1
    else:
        return year, month + 1
    
@login_required(login_url='login')
def confirm_all_bookings(request, calendar_type):
    if request.method == 'POST':
        try:
            bookings = Booking.objects.filter(user=request.user, calendar_type=calendar_type, is_active=False)
            if not bookings.exists():
                messages.error(request, f"No bookings to confirm for {calendar_type}.")
                return redirect('calendar', calendar_type=calendar_type)

            for booking in bookings:
                if not booking.is_confirmed:
                    booking.confirm()

            messages.success(request, f"All your bookings for {calendar_type} have been confirmed.")
        except Exception as e:
            messages.error(request, f"Error confirming bookings for {calendar_type}: " + str(e))
    else:
        messages.error(request, "Invalid request method.")
    return redirect('calendar', calendar_type=calendar_type)

def booking_success(request):
    return render(request, 'booking_success.html')

def booking_already_confirmed(request):
    return render(request, 'booking_already_confirmed.html')
    
import logging

logger = logging.getLogger(__name__)

@login_required(login_url='login')
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            subject = form.cleaned_data['subject']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            email_message = EmailMessage(
                'Contact form Submission from {}'.format(name),
                'Subject: {}\n\nMessage: {}'.format(subject, message),
                email,
                ['kobarelov.k@gmail.com'],
                reply_to=[email]
            )

            try:
                email_message.send(fail_silently=False)
                logger.info("Email sent successfully.")
            except Exception as e:
                logger.error("Error sending email: %s", e)

            return redirect('contact')
        else:
            logger.warning("Form is not valid.")
    else:
        form = ContactForm()
    return render(request, 'contacts.html', {'form': form})
