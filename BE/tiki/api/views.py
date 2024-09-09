from django.shortcuts import render
from .models import Category, Seller, Image, Book
from rest_framework.response import Response
from .serializers import CategorySerializer, SellerSerializer, ImageSerializer, BookSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def search(request):
    seller = request.GET.get('seller', None)
    category = request.GET.get('category', None)
    sort_price = request.GET.get('sort', None)
    vote = request.GET.get('vote', 0)
    query = request.GET.get('query', None)

    # Start with all books
    books = Book.objects.all()
    if query:
        books = books.filter(name__icontains=query)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    # Filter by seller if provided
    if seller:
        books = books.filter(current_seller__name__icontains=seller)

    # Filter by category if provided
    if category:
        books = books.filter(categories__name__icontains=category)

    # Filter by vote if provided
    if vote:
        books = books.filter(rating_average__gte=vote)

    # Sort by price if specified
    if sort_price is not None:
        if sort_price.lower() == 'true':
            books = books.order_by('-price')
        else:
            books = books.order_by('price')  

    serializer = BookSerializer(books, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def book_detail(request, pk):
    book = Book.objects.get(pk=pk)
    serializer = BookSerializer(book)
    return Response(serializer.data)