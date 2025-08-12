from rest_framework import serializers
from .models import Animal

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields =  '__all__'  # Include all fields from the Animal model
        read_only_fields = ['id', 'uploaded_at']  # Make id and uploaded_at read-only
