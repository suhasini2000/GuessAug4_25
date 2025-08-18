from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    check_admin,
    AnimalListCreateView,
    AnimalDetailView,
    AnimalSearchView,
    RandomAnimalView,
    guess_animal,
    AnimalCountView,
    user_login,
    user_register,
    AnimalUpdateByNameView
)

urlpatterns = [
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin check
    path('api/check-admin/', check_admin, name='check_admin'),

    # Animal API
    path('api/animals/update-by-name/', AnimalUpdateByNameView.as_view(), name='animal_update_by_name'),
    path('api/animals/', AnimalListCreateView.as_view(), name='animal_list_create'),
    path('api/animals/<int:pk>/', AnimalDetailView.as_view(), name='animal_detail'),
    path('api/animals/search/', AnimalSearchView.as_view(), name='animal_search'),
    path('api/random-animal/', RandomAnimalView.as_view(), name='random_animal'),
    path('api/guess-animal/', guess_animal, name='guess_animal'),
    path('api/animals/count/', AnimalCountView.as_view(), name='animal-count'),
    path('api/animals/search/', AnimalSearchView.as_view(), name='animal_search'),

    # User Auth
    path('api/user-login/', user_login),
    path('api/user-register/', user_register),
]