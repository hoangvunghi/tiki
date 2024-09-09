from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search, name='search'),
    path('book/<int:pk>/', views.book_detail, name='book_detail'),
]