from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    check_admin,
    AnimalListCreateView,
    AnimalDetailView,
    AnimalSearchView,RandomAnimalView ,      
guess_animal
)
from .views import user_login, user_register


urlpatterns = [
    # JWT Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin check
    path('check-admin/', check_admin, name='check_admin'),

    # Animal API
    path('animals/', AnimalListCreateView.as_view(), name='animal_list_create'),
    path('animals/<int:pk>/', AnimalDetailView.as_view(), name='animal_detail'),
    path('animals/search/', AnimalSearchView.as_view(), name='animal_search'),
    path('user-login/', user_login),
    path('user-register/', user_register),
    path('random-animal/', RandomAnimalView.as_view(), name='random_animal'),   
    path('guess-animal/', guess_animal, name='guess_animal'),  # <-- add this

    

]