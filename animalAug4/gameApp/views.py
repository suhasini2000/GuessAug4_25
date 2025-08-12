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
