# Deployment Guide - Heart Disease Predictor

## Architecture
Your app has two components that need separate deployment:
1. **Frontend** (React + Vite) - Can be static
2. **Backend** (FastAPI + Python) - Needs a Python server

## Recommended Deployment Strategy

### Option 1: GitHub Pages (Frontend) + Render (Backend) - FREE

#### Step 1: Deploy Backend to Render
1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your `HeartDiseasePredictor` repository
4. Configure:
   - **Name**: `heart-disease-api`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Copy the deployed URL (e.g., `https://heart-disease-api.onrender.com`)

#### Step 2: Update Frontend API URL
Update `frontend/src/App.jsx`:
```javascript
const API_URL = 'https://heart-disease-api.onrender.com/predict';
```

#### Step 3: Deploy Frontend to GitHub Pages
```bash
cd frontend
npm run build
```

Then enable GitHub Pages:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (we'll create this)

Run deployment script:
```bash
cd frontend
npm install -D gh-pages
npm pkg set scripts.predeploy="npm run build"
npm pkg set scripts.deploy="gh-pages -d dist"
npm pkg set homepage="https://ayushsinha0804.github.io/HeartDiseasePredictor"
npm run deploy
```

Your app will be live at: `https://ayushsinha0804.github.io/HeartDiseasePredictor`

---

### Option 2: Vercel (Easier, All-in-One) - FREE

#### Deploy Both Frontend and Backend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Import your `HeartDiseasePredictor` repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - Add environment variable: `API_URL=https://your-project.vercel.app/api`

For backend as serverless:
4. Create `api/predict.py` in root:
```python
from backend.main import app
# Vercel serverless wrapper
```

---

### Option 3: Railway (Full Stack) - FREE TIER

1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select `HeartDiseasePredictor`
4. Railway auto-detects both services
5. Configure frontend to point to backend URL

---

## Files Needed for Deployment

### Create `requirements.txt` (for backend)
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
scikit-learn==1.3.2
pandas==2.1.3
numpy==1.26.2
```

### Update `backend/main.py` CORS for production
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ayushsinha0804.github.io",
        "http://localhost:5173"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Quick Start (Recommended: Option 1)

I can help you:
1. Create `requirements.txt`
2. Set up GitHub Actions for automated deployment
3. Configure the frontend build

Which deployment option would you like me to set up?
