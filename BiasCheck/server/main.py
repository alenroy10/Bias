import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import List, Dict

# Paths
MODEL_PATH = os.path.join(os.path.dirname(__file__), '../model/bias_model.pkl')
GENDER_WORDS_PATH = os.path.join(os.path.dirname(__file__), '../data/gender_label_words.csv')

# Load model
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

# Load gender-coded words
try:
    gender_words_df = pd.read_csv(GENDER_WORDS_PATH)
    gender_words = set(gender_words_df['word'].str.lower())
except Exception as e:
    gender_words = set()
    print(f"Error loading gender-coded words: {e}")

# FastAPI app
app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    label: str
    probabilities: Dict[str, float]
    gender_words: List[str]

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    text = request.text
    # Predict
    pred = model.predict([text])[0]
    proba = model.predict_proba([text])[0]
    classes = model.classes_
    probabilities = {cls: float(p) for cls, p in zip(classes, proba)}
    # Gender-coded words detection
    found_words = sorted({w for w in text.lower().split() if w in gender_words})
    return AnalyzeResponse(label=pred, probabilities=probabilities, gender_words=found_words)

@app.get("/")
def root():
    return {"message": "BiasCheck API is running."} 