import os
import django
import json
from django.core.exceptions import ObjectDoesNotExist

# Thiết lập môi trường Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tiki.settings')  # Thay 'tiki.settings' bằng tên settings của dự án của bạn
django.setup()
from api.models import Image  # Đảm bảo thay 'api' bằng tên ứng dụng của bạn

def import_images_from_json(json_data):
    # Giả sử json_data là một danh sách các từ điển như trong ví dụ bạn cung cấp
    for item in json_data:
        # Tạo hoặc cập nhật đối tượng Image
        image_data = {
            'base_url': item.get('base_url'),
            'large_url': item.get('large_url'),
            'medium_url': item.get('medium_url'),
            'small_url': item.get('small_url'),
            'thumbnail_url': item.get('thumbnail_url')
        }
        
        # Nếu có thể xác định duy nhất bằng base_url
        image, created = Image.objects.update_or_create(
            base_url=image_data['base_url'],
            defaults=image_data
        )
        
        if created:
            print(f'Created new image: {image.base_url}')
        else:
            print(f'Updated existing image: {image.base_url}')

# Ví dụ về cách sử dụng hàm
json_data = [
    {
                "base_url": "https://salt.tikicdn.com/media/catalog/product/g/u/gulliver_s_travels.jpg",
                
                "large_url": "https://salt.tikicdn.com/cache/w1200/media/catalog/product/g/u/gulliver_s_travels.jpg",
                "medium_url": "https://salt.tikicdn.com/cache/w300/media/catalog/product/g/u/gulliver_s_travels.jpg",

                "small_url": "https://salt.tikicdn.com/cache/200x280/media/catalog/product/g/u/gulliver_s_travels.jpg",
                "thumbnail_url": "https://salt.tikicdn.com/cache/200x280/media/catalog/product/g/u/gulliver_s_travels.jpg"
            }
]

import_images_from_json(json_data)
