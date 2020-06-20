from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

# Create your views here.
def index(req):
    return HttpResponse("<h1> Hello World from Django</h1>")


def new(req):
    return HttpResponse("ok works")

