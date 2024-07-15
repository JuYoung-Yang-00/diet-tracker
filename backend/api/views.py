from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, FoodPostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import FoodPost

# User creation view
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# List and create food posts
class FoodPostListCreateView(generics.ListCreateAPIView):
    queryset = FoodPost.objects.all()
    serializer_class = FoodPostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Retrieve, update, and delete food post
class FoodPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodPost.objects.all()
    serializer_class = FoodPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(author=self.request.user)

class FoodPostDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        food_post = self.get_object(pk)
        if not food_post:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if food_post.author != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        food_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self, pk):
        try:
            return FoodPost.objects.get(pk=pk, author=self.request.user)
        except FoodPost.DoesNotExist:
            return None