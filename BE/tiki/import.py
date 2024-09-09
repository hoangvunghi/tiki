import os
import django
import json
from django.core.exceptions import ObjectDoesNotExist

# Thiết lập môi trường Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tiki.settings')  # Thay 'tiki.settings' bằng tên settings của dự án của bạn
django.setup()
from api.models import Category, Seller, Image, Book  # Đảm bảo thay 'api' bằng tên ứng dụng của bạn

def import_data(json_file):
    # Đọc file JSON
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Import dữ liệu Category
    for item in data.get('categories', []):
        category, created = Category.objects.update_or_create(
            id=item['id'],
            defaults={'name': item['name']}
        )
        if created:
            print(f"Category created: {category.name}")
        else:
            print(f"Category updated: {category.name}")

    # Import dữ liệu Seller
    for item in data.get('sellers', []):
        seller, created = Seller.objects.update_or_create(
            id=item['id'],
            defaults={'name': item['name']}
        )
        if created:
            print(f"Seller created: {seller.name}")
        else:
            print(f"Seller updated: {seller.name}")

    # Import dữ liệu Image
    for item in data.get('images', []):
        image, created = Image.objects.update_or_create(
            base_url=item['base_url'],
            defaults={
                'is_gallery': item['is_gallery'],
                'label': item.get('label'),
                'large_url': item['large_url'],
                'medium_url': item['medium_url'],
                'small_url': item['small_url'],
                'thumbnail_url': item['thumbnail_url']
            }
        )
        if created:
            print(f"Image created: {image.base_url}")
        else:
            print(f"Image updated: {image.base_url}")

    # Import dữ liệu Book
    for item in data.get('books', []):
        try:
            category = Category.objects.get(id=item['category_id'])
            seller = Seller.objects.get(id=item['current_seller_id'])
            book, created = Book.objects.update_or_create(
                id=item['id'],
                defaults={
                    'name': item['name'],
                    'description': item.get('description', ''),
                    'short_description': item.get('short_description', ''),
                    'list_price': item['list_price'],
                    'original_price': item['original_price'],
                    'rating_average': item['rating_average'],
                    'quantity_sold': item.get('quantity_sold', ''),
                    'publisher_vn': item.get('publisher_vn', ''),
                    'publication_date': item.get('publication_date', None),
                    'dimensions': item.get('dimensions', ''),
                    'dich_gia': item.get('dich_gia', ''),
                    'number_of_page': item.get('number_of_page', ''),
                    'is_hidden': item.get('is_hidden', False),
                    'categories': category,
                    'current_seller': seller
                }
            )

            # Import ảnh liên kết với Book
            image_ids = item.get('image_ids', [])
            images = Image.objects.filter(id__in=image_ids)
            book.images.set(images)

            if created:
                print(f"Book created: {book.name}")
            else:
                print(f"Book updated: {book.name}")

        except Category.DoesNotExist:
            print(f"Category with id {item['category_id']} does not exist.")
        except Seller.DoesNotExist:
            print(f"Seller with id {item['current_seller_id']} does not exist.")

if __name__ == '__main__':
    # Đường dẫn tới file JSON của bạn
    json_file_path = 'a.json'  # Thay thế đường dẫn file JSON của bạn tại đây
    import_data(json_file_path)
