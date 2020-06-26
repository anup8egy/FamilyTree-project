from django.shortcuts import render
from django.views import View, generic
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Create your views here.


@method_decorator(ensure_csrf_cookie, name="dispatch")
class FrontEndView(generic.TemplateView):
    template_name = "index.html"

