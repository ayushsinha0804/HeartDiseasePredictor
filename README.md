# Heart Disease Predictor

A production-ready heart disease prediction application with an advanced Random Forest model and premium minimalist frontend inspired by [lxvii.io](https://lxvii.io/).

## Features

- **Enhanced ML Model**: Random Forest Classifier with 82% accuracy
- **Clinical Validation**: Feature importance analysis ensuring medical relevance
- **FastAPI Backend**: High-performance REST API with automatic validation
- **Premium UI**: Dark-themed bento-grid interface built with React + Vite + Tailwind v4

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm

### Backend Setup
```bash
# Install Python dependencies
pip install pandas numpy scikit-learn fastapi uvicorn pydantic

# Train the model (optional - pre-trained model included)
python model_training.py

# Start the backend server
python backend/main.py
```
Backend runs on `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Project Structure
```
.
├── backend/
│   └── main.py              # FastAPI server
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main UI component
│   │   └── index.css       # Tailwind styles
│   └── package.json
├── models/
│   ├── heart_model.pkl      # Trained Random Forest model
│   └── scaler.pkl           # Feature scaler
├── heart_disease_data.csv   # Training dataset
└── model_training.py        # Model training script
```

## Model Performance

- **Algorithm**: Random Forest Classifier (100 trees, max depth 7)
- **Test Accuracy**: 82%
- **Top Clinical Predictors**:
  1. Thalassemia status (15.16%)
  2. Chest pain type
  3. Major vessel count
  4. Exercise-induced angina
  5. ST depression (oldpeak)

## API Endpoints

### `POST /predict`
Predict heart disease risk based on patient data.

**Request Body:**
```json
{
  "age": 57,
  "sex": 1,
  "cp": 0,
  "trestbps": 130,
  "chol": 236,
  "fbs": 0,
  "restecg": 0,
  "thalach": 174,
  "exang": 0,
  "oldpeak": 0.0,
  "slope": 1,
  "ca": 0,
  "thal": 2
}
```

**Response:**
```json
{
  "prediction": 1,
  "probability": 0.69,
  "risk_level": "High"
}
```

## Technologies

- **Backend**: FastAPI, scikit-learn, pandas, numpy
- **Frontend**: React, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons
- **ML**: Random Forest Classifier with StandardScaler normalization

## License

MIT
