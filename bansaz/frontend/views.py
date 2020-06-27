from django.shortcuts import render, redirect, get_object_or_404
from django.views import View, generic
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.models import User
from datetime import datetime, timezone
from api.models import Profile

# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class FrontEndView(generic.TemplateView):
    template_name = "index.html"


class EmailVerification(View):
    def get(self, request, uidb64, token_code):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except:
            return HttpResponse("Activation link is invalid!")

        if (
            user.profile.token_code == token_code
            and user.profile.token_expiration > datetime.now(timezone.utc)
        ):
            user.profile.account_activated = True
            user.profile.save()
            return redirect("/register")
        return HttpResponse("Activation link is invalid! or the link is stale")
