from django.shortcuts import render, get_object_or_404
from django.views import View, generic
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

from api.models import Profile

# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class FrontEndView(generic.TemplateView):
    template_name = "index.html"


class EmailVerification(View):
    def get(self, request, token_code):

        return HttpResponse(token_code)
