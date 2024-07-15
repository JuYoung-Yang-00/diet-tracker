from django.db import models
from django.contrib.auth.models import User


class FoodPost(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    meal = models.CharField(max_length=20, choices=[("breakfast", "Breakfast"), ("lunch", "Lunch"), ("dinner", "Dinner")])    
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="foodposts")

    def __str__(self):
        return self.title