from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
import io
import os


# ==========================================
# LOAD CADI-AI MODEL
# ==========================================

model = YOLO("models/yolov12x.pt")


# ==========================================
# CREATE RESULTS FOLDER
# ==========================================

os.makedirs("results", exist_ok=True)


# ==========================================
# FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="Precision Farming API",
    description="Backend API for CNN + YOLO based crop analysis",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5177"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# SERVE RESULT IMAGES
# ==========================================

app.mount(
    "/results",
    StaticFiles(directory="results"),
    name="results"
)


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Precision Farming Backend is running successfully!"
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Precision Farming API"
    }


# ==========================================
# CROP PREDICTION
# ==========================================

@app.post("/predict")
async def predict_crop(file: UploadFile = File(...)):

    # ------------------------------------------
    # Read uploaded image
    # ------------------------------------------

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")


    # ------------------------------------------
    # Image dimensions
    # ------------------------------------------

    image_width, image_height = image.size

    total_image_area = image_width * image_height


    # ------------------------------------------
    # Run CADI-AI YOLO model
    # ------------------------------------------

    results = model(
        image,
        conf=0.25
    )


    # ------------------------------------------
    # Store detections
    # ------------------------------------------

    detections = []


    # ------------------------------------------
    # Create annotated image
    # ------------------------------------------

    annotated_image = image.copy()

    draw = ImageDraw.Draw(
        annotated_image
    )


    # ------------------------------------------
    # Process detections
    # ------------------------------------------

    for result in results:

        if result.boxes is None:
            continue

        for box in result.boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0].tolist()
            )

            class_name = model.names[class_id]

            confidence_percent = round(
                confidence * 100,
                2
            )


            # ------------------------------
            # Save detection information
            # ------------------------------

            detections.append({
                "class": class_name,
                "confidence": confidence_percent,
                "box": [
                    x1,
                    y1,
                    x2,
                    y2
                ]
            })


            # ------------------------------
            # Draw bounding box
            # ------------------------------

            draw.rectangle(
                [x1, y1, x2, y2],
                outline="red",
                width=5
            )


            # ------------------------------
            # Draw label
            # ------------------------------

            label = (
                f"{class_name} "
                f"{confidence_percent}%"
            )


            # Label background
            label_x1 = x1
            label_y1 = max(
                0,
                y1 - 30
            )

            label_x2 = x1 + 220
            label_y2 = y1


            draw.rectangle(
                [
                    label_x1,
                    label_y1,
                    label_x2,
                    label_y2
                ],
                fill="red"
            )


            # Label text
            draw.text(
                (
                    label_x1 + 5,
                    label_y1 + 5
                ),
                label,
                fill="white"
            )


    # ==========================================
    # NO DETECTION
    # ==========================================

    if not detections:

        return {
            "message": "No crop-health problem detected",
            "filename": file.filename,
            "condition": "No Detection",
            "confidence": 0,
            "status": "No Problem Detected",
            "affected_area": "0%",
            "detections": []
        }


    # ==========================================
    # SAVE ANNOTATED IMAGE
    # ==========================================

    output_filename = (
        "analyzed_" +
        file.filename
    )

    output_path = os.path.join(
        "results",
        output_filename
    )

    annotated_image.save(
        output_path
    )


    # ==========================================
    # PRIMARY DETECTION
    # ==========================================

    primary_detection = max(
        detections,
        key=lambda item: item["confidence"]
    )


    condition = (
        primary_detection["class"]
        .capitalize()
    )

    confidence = (
        primary_detection["confidence"]
    )


    # ==========================================
    # AFFECTED AREA
    # ==========================================

    detected_area = 0

    for detection in detections:

        x1, y1, x2, y2 = (
            detection["box"]
        )

        width = max(
            0,
            x2 - x1
        )

        height = max(
            0,
            y2 - y1
        )

        detected_area += (
            width * height
        )


    affected_percentage = (
        detected_area /
        total_image_area
    ) * 100


    affected_percentage = min(
        affected_percentage,
        100
    )


    # ==========================================
    # STATUS
    # ==========================================

    if condition == "Disease":

        status = "Needs Attention"

    elif condition == "Insect":

        status = "Pest Detected"

    elif condition == "Abiotic":

        status = "Stress Detected"

    else:

        status = "Detected"


    # ==========================================
    # MESSAGE
    # ==========================================

    message = (
        f"Possible {condition.lower()} "
        f"condition detected in the crop image."
    )


    # ==========================================
    # FINAL RESPONSE
    # ==========================================

    return {

        "message": message,

        "filename": file.filename,

        "condition": condition,

        "confidence": confidence,

        "status": status,

        "affected_area": (
            f"{round(affected_percentage, 2)}%"
        ),

        "detections": detections,

        "annotated_image": (
            f"/results/{output_filename}"
        )
    }