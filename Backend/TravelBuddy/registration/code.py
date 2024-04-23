from django.core.mail import send_mail
import random
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import guide, seller, user, Code
from datetime import datetime, timedelta


def sendVerificationEmail(email):
    subject = "Account Verification Email"
    otp = random.randint(1000, 9999)
    message = f"Your OTP is {otp}"
    email_from = settings.EMAIL_HOST
    userData = user.objects.filter(email=email)
    guideData = guide.objects.filter(email=email)
    sellerdata = seller.objects.filter(email=email)
    now = datetime.now()

    five_minutes_later = now + timedelta(minutes=5)

    if len(userData) > 0:
        Code.objects.create(
            code=otp, user_id=userData[0].id, expiry=five_minutes_later)
    elif len(guideData) > 0:
        Code.objects.create(
            code=otp, guide_id=guideData[0].id, expiry=five_minutes_later)

    elif len(sellerdata) > 0:
        Code.objects.create(
            code=otp, seller_id=sellerdata[0].id, expiry=five_minutes_later)
    else:
        return False

    send_mail(subject, message, email_from, [email])
    return True
