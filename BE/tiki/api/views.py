from django.shortcuts import render
from .models import Category, Seller, Image, Book
from rest_framework.response import Response
from .serializers import CategorySerializer, SellerSerializer, ImageSerializer, BookSerializer
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q

@api_view(['GET'])
def search(request):
    seller = request.GET.get('seller', None)
    category = request.GET.get('category', None)
    sort_price = request.GET.get('sort', None)
    vote = request.GET.get('vote', 0)
    query = request.GET.get('query', None)
    page = request.GET.get('page', 1)
    page_size = request.GET.get('page_size', 10)

    books = Book.objects.all()

    if query:
        books = books.filter(name__icontains=query)

    if seller:
        seller_names = seller.split(',')
        query = Q()
        for name in seller_names:
            query |= Q(current_seller__name__icontains=name.strip())
        books = books.filter(query)

    if category:
        books = books.filter(categories__name__icontains=category)

    if vote:
        books = books.filter(rating_average__gte=vote)

    if sort_price is not None:
        if sort_price.lower() == 'true':
            books = books.order_by('-current_seller__price')
        else:
            books = books.order_by('current_seller__price')

    paginator = Paginator(books, page_size)

    try:
        paginated_books = paginator.page(page)
    except PageNotAnInteger:
        paginated_books = paginator.page(1)
    except EmptyPage:
        paginated_books = paginator.page(paginator.num_pages)

    serializer = BookSerializer(paginated_books, many=True)

    return Response({
        'books': serializer.data,
        'page': paginated_books.number,
        'total_pages': paginator.num_pages,
        'total_books': paginator.count,
        'has_next': paginated_books.has_next(),
        'has_previous': paginated_books.has_previous(),
    })


@api_view(['GET'])
def book_detail(request, pk):
    book = Book.objects.get(pk=pk)
    serializer = BookSerializer(book)
    return Response(serializer.data)
