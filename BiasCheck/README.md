# BiasCheck

A full-stack bias detection app with:
- 🧠 Machine Learning model (scikit-learn, joblib)
- 🔧 Backend: FastAPI (Python)
- 🖥️ Frontend: React + Vite (with Firebase Auth)
- 📁 Data/model: bias_model.pkl, biascheck_dataset.csv, gender_label_words.csv

## Project Structure

```
BiasCheck/
  client/         # React + Vite frontend
  server/         # FastAPI backend
  model/          # ML model
  data/           # Datasets and lexicons
```

## Setup & Run

### 1. Backend (FastAPI)
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```
- API: http://localhost:8000/

### 2. Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```
- App: http://localhost:5173/

### 3. Firebase Setup
- Add your Firebase config to `client/src/config/firebase.js`.
- Enable Email/Password Auth and Firestore in Firebase Console.

## Features
- Register/login/logout (Firebase Auth)
- Analyze job descriptions for bias (calls FastAPI backend)
- Save and view analysis history (Firestore)
- Protected routes for authenticated users

---

**If you have issues, check the README or contact the maintainer.** 