from django.db import models

# Create your models here.
class Animal(models.Model):
    name= models.CharField(max_length=100)
    image = models.ImageField(upload_to='animals/')
    description = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.name} ({self.description})"

class GameUser(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    age = models.IntegerField()
    qualification = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)  # for demo only; use hashing in real apps

    def __str__(self):
        return self.username