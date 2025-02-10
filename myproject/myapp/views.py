from django.conf import settings
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework import status
from .models import UploadedImage
from django.http import JsonResponse
from .serializers import ImageSerializer
import os
import cv2
import numpy as np
from .image_processing import process_image
from .image_processing import process_image_path

class ImageProcessView(APIView):

    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print("\n >> The API view args are : ",request, *args, **kwargs)
        file_obj = request.FILES.get('image')
        if not file_obj:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Read image as NumPy array (without saving)
        np_img = np.frombuffer(file_obj.read(), np.uint8)
        image = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        # Process image & extract text
        extracted_text = process_image(image)
        print("\n The extracted text in the view is : ", extracted_text)

        resp_obj = {"message": "Image processed successfully", "extracted_text": extracted_text}

        resp = JsonResponse(resp_obj,status=status.HTTP_200_OK)

        print("\n The content of the response is : ", resp.content)

        # resp = Response({"message": "Image processed successfully", "extracted_text": extracted_text}, status=status.HTTP_200_OK)
        print("\n The response to be sent is :- \n", resp)
        return resp

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            saved_instance = serializer.save()
            
            # Get the file path of the saved image
            image_path = os.path.join(settings.MEDIA_ROOT, str(saved_instance.image))

            # Process the image and get the text output
            extracted_text = process_image_path(image_path)

            # Return the processed text as a response
            return Response({"message": "Image processed successfully", "extracted_text": extracted_text}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

