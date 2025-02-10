import cv2
import os
from ultralytics import YOLO
from paddleocr import PaddleOCR     

def extract_number_plate_region(image, model):
    results = model(image)
    detections = results[0].boxes
    for detection in detections:
        x1, y1, x2, y2 = map(int, detection.xyxy[0])
        cropped_image = image[y1:y2, x1:x2]
        return cropped_image
    return None

def apply_ocr(cropped_image, ocr_model):
    if cropped_image is None:
        return "No number plate detected."
    
    results = ocr_model.ocr(cropped_image, cls=True)
    
    # Check if results is empty or contains None
    if not results or results[0] is None: 
        return "No text detected in the image."
        
    text = ""
    for line in results:
        for res in line:
            text += res[1][0] + " "
    return text.strip()

def process_image(image):
    try:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(BASE_DIR, "image_models", "v1.pt")

        if not os.path.exists(model_path):
            return f"Error: Model file not found at {model_path}"

        model = YOLO(model_path)
        ocr_model = PaddleOCR(use_angle_cls=True, lang='en')

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        cropped_plate = extract_number_plate_region(image_rgb, model)
        number_plate_text = apply_ocr(cropped_plate, ocr_model)

        print(">> Number plate text detected is ", number_plate_text)

        return number_plate_text.strip()
    
    except Exception as e:
        print("\n Exception occured while processing the image!", {str(e)})
        return f"Error processing image: {str(e)}"
    
def process_image_path(image_path):
    try:
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(BASE_DIR, "image_models", "v1.pt")

        if not os.path.exists(model_path):
            return f"Error: Model file not found at {model_path}"

        model = YOLO(model_path)
        ocr_model = PaddleOCR(use_angle_cls=True, lang='en')

        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        cropped_plate = extract_number_plate_region(image_rgb, model)
        number_plate_text = apply_ocr(cropped_plate, ocr_model)

        print(">> Number plate text detected is ", number_plate_text)

        return number_plate_text.strip()
    
    except Exception as e:
        return f"Error processing image: {str(e)}"
