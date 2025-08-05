from django.shortcuts import render
from django.views import View
from django.utils import timezone
from .models import Animal
from .serializers import AnimalSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import random  # <-- 🔥 Add this

class AddAnimalView(View):
    def get(self, request):
        return render(request, 'add_animal.html')  # render template

    def post(self, request):
        name = request.POST.get('name')
        image = request.FILES.get('image')

        if name and image:
            animal = Animal.objects.create(name=name, image=image, uploaded_at=timezone.now())
            return render(request, 'add_animal.html', {"message": "Animal added successfully!"})

        return render(request, 'add_animal.html', {"error": "All fields are required!"})

class RandomAnimalView(APIView):
    def get(self, request):
        animals = Animal.objects.all()
        if animals:
            animal = random.choice(animals)
            serializer = AnimalSerializer(animal)
            return Response(serializer.data)
        return Response({'error': 'No animals available'}, status=404)
