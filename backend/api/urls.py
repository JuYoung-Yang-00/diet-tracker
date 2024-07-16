from django.urls import path
from . import views

urlpatterns = [
    path("meals/", views.FoodPostListCreateView.as_view(), name="meals-list-create"),
    path("meals/<int:pk>", views.FoodPostDetailView.as_view(), name="meals-detail"),
    path("meals/user/<int:user_id>/", views.UserMealsListView.as_view(), name="user-meals-list"),

]