from django.urls import path
from . import views

urlpatterns = [
    path("meals/", views.FoodPostListCreateView.as_view(), name="meals-list"),
    path("meals/delete/<int:pk>/", views.FoodPostDeleteView.as_view(), name="delete-meal"),
]