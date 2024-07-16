from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, FoodPostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import FoodPost
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

# User views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)



# List and create food posts
class FoodPostListCreateView(generics.ListCreateAPIView):
    queryset = FoodPost.objects.all()
    serializer_class = FoodPostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserMealsListView(generics.ListAPIView):
    serializer_class = FoodPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if self.request.user.id != user_id and not self.request.user.is_staff:
            raise PermissionDenied("You do not have permission to view these meals.")
        return FoodPost.objects.filter(author_id=user_id)
    
    
# Retrieve, update, and delete food post
class FoodPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodPost.objects.all()
    serializer_class = FoodPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # This ensures that users can only access their own posts
        return self.queryset.filter(author=self.request.user)

    def delete(self, request, *args, **kwargs):
        food_post = self.get_object()
        if food_post.author != request.user:
            # Raising PermissionDenied if the user trying to delete the post is not the author
            raise PermissionDenied("You do not have permission to delete this post.")
        return super().delete(request, *args, **kwargs)
    
    
    
# class FoodPostDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = FoodPost.objects.all()
#     serializer_class = FoodPostSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return self.queryset.filter(author=self.request.user)

# class FoodPostDeleteView(APIView):
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, pk, format=None):
#         food_post = self.get_object(pk)
#         if not food_post:
#             return Response(status=status.HTTP_404_NOT_FOUND)
        
#         if food_post.author != request.user:
#             return Response(status=status.HTTP_403_FORBIDDEN)

#         food_post.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#     def get_object(self, pk):
#         try:
#             return FoodPost.objects.get(pk=pk, author=self.request.user)
#         except FoodPost.DoesNotExist:
#             return None