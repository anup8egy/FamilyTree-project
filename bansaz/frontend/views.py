from django.shortcuts import render
from django.views import View, generic

# Create your views here.


class FrontEndView(generic.TemplateView):
    template_name = "index.html"

