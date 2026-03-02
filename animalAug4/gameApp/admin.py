from django.contrib import admin

# Register your models here.

from .models import Animal, GameUser

@admin.register(Animal)

class AnimalAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'image','uploaded_at']

@admin.register(GameUser)
class GameUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'firstname', 'lastname', 'age', 'qualification', 'username']
    search_fields = ['username']