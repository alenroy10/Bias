# scripts/gender_bias_check.py
import pandas as pd

def load_gender_word_lists():
    df = pd.read_csv("data/gender_label_words_cleaned.csv")
    male_words = df[df["label"] == "male"]["word"].tolist()
    female_words = df[df["label"] == "female"]["word"].tolist()
    return male_words, female_words

def detect_gender_bias(text, male_words, female_words):
    text = text.lower()
    found_male = [w for w in male_words if w in text]
    found_female = [w for w in female_words if w in text]
    return {
        "male_words": found_male,
        "female_words": found_female,
        "bias_detected": len(found_male + found_female) > 0
    }

# Example usage
if __name__ == "__main__":
    sample = "We are looking for an aggressive and competitive rockstar developer."
    male_words, female_words = load_gender_word_lists()
    result = detect_gender_bias(sample, male_words, female_words)
    print("Bias detected:", result["bias_detected"])
    print("Male-coded words:", result["male_words"])
    print("Female-coded words:", result["female_words"])
