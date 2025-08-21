from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .models import Animal, GameUser
from .serializers import AnimalSerializer
import random

# --- GameUser Login & Register (for your custom users) ---

@api_view(['POST'])
@permission_classes([AllowAny])
def gameuser_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user = GameUser.objects.get(username=username)
        if user.password == password:
            request.session['gameuser_id'] = user.id  # Set session for this user
            return Response({"success": True, "user_id": user.id})
        else:
            return Response({"success": False, "error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
    except GameUser.DoesNotExist:
        return Response({"success": False, "error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def gameuser_register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    firstname = request.data.get('firstname', '')
    lastname = request.data.get('lastname', '')
    age = request.data.get('age', 0)
    qualification = request.data.get('qualification', '')
    if GameUser.objects.filter(username=username).exists():
        return Response({"success": False, "error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    user = GameUser.objects.create(
        username=username,
        password=password,
        firstname=firstname,
        lastname=lastname,
        age=age,
        qualification=qualification
    )
    return Response({"success": True, "user_id": user.id})

# --- Custom Permission for GameUser session authentication ---

class IsGameUserLoggedIn(BasePermission):
    def has_permission(self, request, view):
        return bool(request.session.get('gameuser_id'))

# --- Animal CRUD (admin only, Django User JWT required) ---

class AnimalListCreateView(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated]

class AnimalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [IsAuthenticated]

class AnimalSearchView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        name = request.query_params.get('name', None)
        if name:
            animals = Animal.objects.filter(name__iexact=name)
        else:
            animals = Animal.objects.all()
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)

class AnimalUpdateByNameView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        name = request.data.get('name')
        new_name = request.data.get('new_name')
        image = request.data.get('image')
        try:
            animal = Animal.objects.get(name__iexact=name)
            if new_name:
                animal.name = new_name
            if image:
                animal.image = image
            animal.save()
            return Response({"success": True})
        except Animal.DoesNotExist:
            return Response({"success": False, "error": "Animal not found."}, status=404)

# --- Game APIs (for logged-in GameUser only) ---

@api_view(['GET'])
@permission_classes([IsGameUserLoggedIn])
def random_animal_view(request):
    animals = Animal.objects.all()
    if animals:
        animal = random.choice(animals)
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)
    return Response({"detail": "No animals found."}, status=404)

@api_view(['POST'])
@permission_classes([IsGameUserLoggedIn])
def guess_animal(request):
    animal_id = request.data.get('id')
    guess = request.data.get('guess', '').strip().lower()
    try:
        animal = Animal.objects.get(id=animal_id)
        if animal.name.strip().lower() == guess:
            return Response({"correct": True, "animal": AnimalSerializer(animal).data})
        else:
            return Response({"correct": False})
    except Animal.DoesNotExist:
        return Response({"correct": False})
    
@api_view(['GET'])
@permission_classes([IsGameUserLoggedIn])
def animal_count_view(request):
    count = Animal.objects.count()
    return Response({"count": count})

# --- Admin/Superuser checks (Django User JWT only) ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin(request):
    user = request.user
    return Response({"is_staff": getattr(user, "is_staff", False)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_superuser(request):
    user = request.user
    return Response({"is_superuser": getattr(user, "is_superuser", False)})