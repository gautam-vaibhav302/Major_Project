from django.urls import path
from .views import ImageProcessView

urlpatterns = [
    path('upload/', ImageProcessView.as_view(), name='image-upload'),
]
