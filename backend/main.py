from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Heart Disease Predictor API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "heart_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
except Exception as e:
    print(f"Error loading model artifacts: {e}")
    model = None
    scaler = None

class PatientData(BaseModel):
    age: int
    sex: int  # 1 = male; 0 = female
    cp: int   # chest pain type (0-3)
    trestbps: int # resting blood pressure
    chol: int     # serum cholestoral in mg/dl
    fbs: int      # fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
    restecg: int  # resting electrocardiographic results (0-2)
    thalach: int  # maximum heart rate achieved
    exang: int    # exercise induced angina (1 = yes; 0 = no)
    oldpeak: float # ST depression induced by exercise relative to rest
    slope: int    # the slope of the peak exercise ST segment (0-2)
    ca: int       # number of major vessels (0-4) colored by flourosopy
    thal: int     # 1 = normal; 2 = fixed defect; 3 = reversable defect

@app.get("/")
def read_root():
    return {"status": "Heart Disease Predictor API is running", "model_loaded": model is not None}

@app.post("/predict")
def predict(data: PatientData):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or Scaler not loaded on server")
    
    try:
        # Convert input to array
        input_data = [
            data.age, data.sex, data.cp, data.trestbps, data.chol,
            data.fbs, data.restecg, data.thalach, data.exang,
            data.oldpeak, data.slope, data.ca, data.thal
        ]
        
        # Standardize
        input_array = np.array(input_data).reshape(1, -1)
        input_scaled = scaler.transform(input_array)
        
        # Predict
        prediction = model.predict(input_scaled)
        probability = model.predict_proba(input_scaled)[0][1]
        
        return {
            "prediction": int(prediction[0]),
            "probability": float(probability),
            "risk_level": "High" if prediction[0] == 1 else "Low"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
