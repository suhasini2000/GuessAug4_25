from django.urls import path
from .views import AddAnimalView, RandomAnimalView,guess_animal

urlpatterns = [
     path('add-animal/', AddAnimalView.as_view(), name='add-animal'),
     path('api/random-animal/', RandomAnimalView.as_view(), name='random-animal'),
     path('api/guess-animal/', guess_animal,name='guess_animal'),
]
