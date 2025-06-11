from django.urls import path
from . import views

urlpatterns = [
    path('get_country', views.get_country, name='get_country'),
    path('check', views.check_capital, name='check'),
]
