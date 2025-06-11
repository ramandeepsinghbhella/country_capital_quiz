from django.shortcuts import render
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from django.core.cache import cache
import requests
import random
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

def get_country_data():
    response = requests.get("https://countriesnow.space/api/v0.1/countries/capital")
    if response.status_code == 200:
        result = response.json()
        if not result['error']:
            data = result['data']
            cache.set('countries_data', data, timeout=86400)  # Cache for 24 hours
            return data
        else:
            return JsonResponse({"error": "Failed to fetch countries"}, status=500)
    else:
        return JsonResponse({"error": "External API failed"}, status=500)

@require_GET
def get_country(request):
    data = cache.get('countries_data')

    if not data:
        data = get_country_data()

    idx = random.randint(0, len(data) - 1)
    selected = data[idx]
    return JsonResponse({"country": selected['name'], "id": idx})

@csrf_exempt
@require_POST
def check_capital(request):
    data = cache.get('countries_data')

    body = json.loads(request.body)
    country_name = body.get('country')
    capital_input = body.get('capital')
    idx = body.get('id')

    if not data:
        data = get_country_data()
        idx = None

    if idx is not None:
        try:
            correct_country = data[idx]
            if correct_country['name'] == country_name:
                if correct_country['capital'].lower() == capital_input.lower():
                    return JsonResponse({"message": "Correct!"}, status=200)
                else:
                    return JsonResponse({
                        "message": "Incorrect!",
                        "correct_answer": correct_country['capital']
                    }, status=400)
        except IndexError:
            return JsonResponse({"error": "Invalid index"}, status=400)
    else:
        for item in data:
            if item['name'] == country_name:
                if item['capital'].lower() == capital_input.lower():
                    return JsonResponse({"message": "Correct!"}, status=200)
                else:
                    return JsonResponse({
                        "message": "Incorrect!",
                        "correct_answer": item['capital']
                    }, status=400)

    return JsonResponse({"error": "Country not found"}, status=404)


# Create your views here.
