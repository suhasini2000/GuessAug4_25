from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    check_admin,
    check_superuser,
    AnimalListCreateView,
    AnimalDetailView,
    AnimalSearchView,
    random_animal_view,
    guess_animal,
    animal_count_view,
    gameuser_login,
    gameuser_register,
    AnimalUpdateByNameView
)

urlpatterns = [
    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin check
    path('api/check-admin/', check_admin, name='check_admin'),
    path('api/check-superuser/', check_superuser, name='check_superuser'),

    # Animal API
    path('api/animals/update-by-name/', AnimalUpdateByNameView.as_view(), name='animal_update_by_name'),
    path('api/animals/', AnimalListCreateView.as_view(), name='animal_list_create'),
    path('api/animals/<int:pk>/', AnimalDetailView.as_view(), name='animal_detail'),
    path('api/animals/search/', AnimalSearchView.as_view(), name='animal_search'),
    path('api/random-animal/', random_animal_view, name='random_animal'),
    path('api/guess-animal/', guess_animal, name='guess_animal'),
    path('api/animals/count/', animal_count_view, name='animal-count'),

    # User Auth
    path('api/gameuser-login/', gameuser_login),
    path('api/gameuser-register/', gameuser_register),
]