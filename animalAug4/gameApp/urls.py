from django.urls import path
from .views import AddAnimalView, RandomAnimalView

urlpatterns = [
     path('add-animal/', AddAnimalView.as_view(), name='add-animal'),
     path('api/random-animal/', RandomAnimalView.as_view(), name='random-animal'),
]
