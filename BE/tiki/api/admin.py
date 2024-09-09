from django.contrib import admin
from .models import Category, Seller, Image, Book
# Register your models here.

admin.site.register(Category)
admin.site.register(Seller)
admin.site.register(Image)
admin.site.register(Book)
