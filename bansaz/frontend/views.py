from django.shortcuts import render
from django.views import View

# Create your views here.


class FrontEndView(View):
    def get(self, request):
        return render(request, "index.html")

