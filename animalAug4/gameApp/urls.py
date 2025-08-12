from django.urls import path
from .views import AddAnimalView, RandomAnimalView,guess_animal,user_login,user_register
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    check_admin,
    AnimalListCreateView,
    AnimalDetailView,
    AnimalSearchView,)

urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

     path('check-admin/', check_admin, name='check_admin'),

     path('add-animal/', AddAnimalView.as_view(), name='add-animal'),
     path('api/random-animal/', RandomAnimalView.as_view(), name='random-animal'),
     path('api/guess-animal/', guess_animal,name='guess_animal'),
     path('animals/', AnimalListCreateView.as_view(), name='animal_list_create'),
     path('animals/<int:pk>/', AnimalDetailView.as_view(), name='animal_detail'),
     path('animals/search/', AnimalSearchView.as_view(), name='animal_search'),
     path('user-login/', user_login),
     path('user-register/', user_register),


]
