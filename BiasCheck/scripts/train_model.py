# scripts/train_model.py
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# Load data
df = pd.read_csv("data/biascheck_dataset_labeled.csv")
df = df.dropna(subset=["text", "label"])

# Split
X_train, X_test, y_train, y_test = train_test_split(
    df['text'], df['label'], test_size=0.2, stratify=df['label'], random_state=42
)

# Model pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(max_features=2000, stop_words="english")),
    ("clf", LogisticRegression(max_iter=1000, class_weight="balanced"))
])

# Train and evaluate
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save
joblib.dump(model, "model/bias_model.pkl")
print("✅ Model saved to model/bias_model.pkl")

print(df['label'].value_counts())
