from django.db import models

# Create your models here.

class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Seller(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class Image(models.Model):
    base_url = models.URLField()
    is_gallery = models.BooleanField(default=True)
    label = models.CharField(max_length=255, null=True, blank=True)
    large_url = models.URLField()
    medium_url = models.URLField()
    small_url = models.URLField()
    thumbnail_url = models.URLField()

    def __str__(self):
        return self.base_url
from django.core.exceptions import ValidationError

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=5000)
    author = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    short_description = models.TextField()
    list_price = models.IntegerField()
    price = models.IntegerField()
    original_price = models.IntegerField()
    rating_average = models.DecimalField(max_digits=3, decimal_places=2)
    book_cover = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    categories = models.ForeignKey(Category, on_delete=models.CASCADE)
    current_seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    images = models.ManyToManyField(Image)
    loai_bia = models.CharField(max_length=255, null=True, blank=True)
    isbn13 = models.CharField(max_length=255, null=True, blank=True)
    edition= models.CharField(max_length=255, null=True, blank=True)
    quantity_sold = models.CharField(max_length=255, default='0')
    publisher_vn = models.TextField(blank=True, null=True)
    publication_date = models.DateField(blank=True, null=True)
    dimensions = models.TextField(blank=True, null=True)
    manufacturer = models.TextField(blank=True, null=True)
    dich_gia = models.TextField(blank=True, null=True)
    number_of_page = models.CharField(max_length=255,blank=True, null=True)
    is_hidden = models.BooleanField(default=False)
    percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Increased max_digits for safety

    def __str__(self):
        return self.name

    def cal_percent(self):
        if self.list_price > 0:
            return round((1 - (self.price / self.list_price)) * 100, 2)
        return 0

    def clean(self):
        # Additional validation before saving
        if self.list_price < 0 or self.price < 0:
            raise ValidationError('Price values must be non-negative.')

    def save(self, *args, **kwargs):
        self.clean()  # Ensure data validation
        self.percent = self.cal_percent()
        super().save(*args, **kwargs)
