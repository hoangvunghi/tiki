from rest_framework import serializers
from .models import Book, Category, Seller, Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['base_url', 'is_gallery', 'label', 'large_url', 'medium_url', 'small_url', 'thumbnail_url']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    categories = CategorySerializer(read_only=True)
    current_seller = SellerSerializer(read_only=True)

    class Meta:
        model = Book
        fields = '__all__'  # Or specify the fields you want to include