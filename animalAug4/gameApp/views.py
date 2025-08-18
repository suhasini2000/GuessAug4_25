from urllib import request
from django.shortcuts import render
from django.views import View
from django.utils import timezone
from .models import Animal
from .serializers import AnimalSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,permissions
import random
from rest_framework import generics
from .models import GameUser

from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate, login




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin(request):
    return Response({"is_superuser": request.user.is_superuser})

class AnimalListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  


    def get(self, request):
        animals = Animal.objects.all()
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from django.shortcuts import render
from django.views import View
from django.utils import timezone
from .models import Animal
from .serializers import AnimalSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,permissions
import random
from rest_framework import generics
from .models import GameUser

from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

class AnimalCountView(APIView):
    def get(self, request):
        count = Animal.objects.count()
        return Response({'count': count})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin(request):
    return Response({"is_superuser": request.user.is_superuser})

class AnimalListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  


    def get(self, request):
        animals = Animal.objects.all()
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimalUpdateByNameView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        name = request.data.get("name")
        new_name = request.data.get("new_name")
        try:
            animal = Animal.objects.get(name=name)
            animal.name = new_name
            animal.save()
            serializer = AnimalSerializer(animal)
            return Response(serializer.data)
        except Animal.DoesNotExist:
            return Response({"error": "Animal not found."}, status=status.HTTP_404_NOT_FOUND)

class AnimalDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Animal, pk=pk)

    def get(self, request, pk):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)

    def put(self, request, pk):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        animal = self.get_object(pk)
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SearchAnimalView(APIView):
    def get(self, request):
        name = request.GET.get("name", "").lower()
        try:
            animal = Animal.objects.get(name__iexact=name)
            serializer = AnimalSerializer(animal)
            return Response(serializer.data, status=200)
        except Animal.DoesNotExist:
            return Response({"error": "Animal not found"}, status=404)


# Move user_login function outside the class and fix indentation
@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = GameUser.objects.get(username=username, password=password)
        return Response({"success": True, "message": "Login successful"})
    except GameUser.DoesNotExist:
        return Response({"success": False, "message": "Invalid credentials"})

@api_view(['POST'])
def user_register(request):
    data = request.data
    if GameUser.objects.filter(username=data['username']).exists():
        return Response({"success": False, "message": "Username already exists"})

    GameUser.objects.create(
        firstname=data['firstname'],
        lastname=data['lastname'],
        age=data['age'],
        qualification=data['qualification'],
        username=data['username'],
        password=data['password'],
    )
    return Response({"success": True, "message": "User registered successfully"})

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

import random
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Animal

import random
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Animal

class RandomAnimalView(APIView):
    permission_classes = []  # No authentication required

    def get(self, request):
        animals = list(Animal.objects.all())

        if not animals:
            return Response({'error': 'No animals available'}, status=404)

        shown_ids = request.session.get("shown_animal_ids", [])

        # If all animals have been shown, reset for a new round
        if len(shown_ids) >= len(animals):
            shown_ids = []

        # Get available animals not shown yet in this round
        available_animals = [a for a in animals if a.id not in shown_ids]

        # Pick one randomly
        animal = random.choice(available_animals)

        # Add to session tracking
        shown_ids.append(animal.id)
        request.session["shown_animal_ids"] = shown_ids
        request.session.modified = True

        # Prepare clue
        clue = {
            "id": animal.id,
            "image": request.build_absolute_uri(animal.image.url) if animal.image else "",
            "first_letter": animal.name[0],
            "last_letter": animal.name[-1],
            "name_length": len(animal.name),
        }

        return Response(clue)
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def all_animals(request):
    animals = Animal.objects.all()
    serializer = AnimalSerializer(animals, many=True)
    return Response(serializer.data)


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
class AnimalDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Animal, pk=pk)

    def get(self, request, pk):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)

    def put(self, request, pk):
        animal = self.get_object(pk)
        serializer = AnimalSerializer(animal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        animal = self.get_object(pk)
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AnimalSearchView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', None)
        if query:
            animals = Animal.objects.filter(name__icontains=query)
        else:
            animals = Animal.objects.all()
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)
    

@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = GameUser.objects.get(username=username, password=password)
        return Response({"success": True, "message": "Login successful"})
    except GameUser.DoesNotExist:
        return Response({"success": False, "message": "Invalid credentials"})

@api_view(['POST'])
def user_register(request):
    data = request.data
    if GameUser.objects.filter(username=data['username']).exists():
        return Response({"success": False, "message": "Username already exists"})

    GameUser.objects.create(
        firstname=data['firstname'],
        lastname=data['lastname'],
        age=data['age'],
        qualification=data['qualification'],
        username=data['username'],
        password=data['password'],
    )
    return Response({"success": True, "message": "User registered successfully"})

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

import random
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Animal

import random
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Animal

class RandomAnimalView(APIView):
    permission_classes = []  # No authentication required

    def get(self, request):
        animals = list(Animal.objects.all())

        if not animals:
            return Response({'error': 'No animals available'}, status=404)

        shown_ids = request.session.get("shown_animal_ids", [])

        # If all animals have been shown, reset for a new round
        if len(shown_ids) >= len(animals):
            shown_ids = []

        # Get available animals not shown yet in this round
        available_animals = [a for a in animals if a.id not in shown_ids]

        # Pick one randomly
        animal = random.choice(available_animals)

        # Add to session tracking
        shown_ids.append(animal.id)
        request.session["shown_animal_ids"] = shown_ids
        request.session.modified = True

        # Prepare clue
        clue = {
            "id": animal.id,
            "image": request.build_absolute_uri(animal.image.url) if animal.image else "",
            "first_letter": animal.name[0],
            "last_letter": animal.name[-1],
            "name_length": len(animal.name),
        }

        return Response(clue)
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def all_animals(request):
    animals = Animal.objects.all()
    serializer = AnimalSerializer(animals, many=True)
    return Response(serializer.data)


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