from django.shortcuts import render
from django.views import View
from django.utils import timezone
from .models import Animal
from .serializers import AnimalSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import random  
from rest_framework.decorators import api_view

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
        animals = list(Animal.objects.all())
        if animals:
            animal = random.choice(animals)
            clue = {
                "id": animal.id,
                "image": animal.image.url if animal.image else "",
                "first_letter": animal.name[0],
                "last_letter": animal.name[-1],
                "name_length": len(animal.name),
            }
            return Response(clue)
        return Response({'error': 'No animals available'}, status=404)
from rest_framework.decorators import api_view

@api_view(['POST'])
def guess_animal(request):
    animal_id = request.data.get('id')
    guess = request.data.get('guess', '').strip().lower()
    try:
        animal = Animal.objects.get(id=animal_id)
        correct = animal.name.strip().lower() == guess
        return Response({"correct": correct, "answer": animal.name if correct else None})
    except Animal.DoesNotExist:
        return Response({"error": "Animal not found"}, status=404)