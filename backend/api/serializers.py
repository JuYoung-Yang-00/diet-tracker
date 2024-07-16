from django.contrib.auth.models import User
from rest_framework import serializers
from .models import FoodPost


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class FoodPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodPost
        fields = ["id", "title", "content", "meal", "date", "created_at", "author"]
        extra_kwargs = {
            "author": {"read_only": True},
            "created_at": {"read_only": True}  # Ensuring it's not included in the input
        }