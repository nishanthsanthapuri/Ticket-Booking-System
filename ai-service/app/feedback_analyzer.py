from app.sentiment_analyzer import analyze_sentiment
from app.topic_extractor import extract_topics

def analyze_feedback(review: str):
    sentiment = analyze_sentiment(review)
    topics = extract_topics(review)

    return {
        "sentiment": sentiment,
        "topics": topics
    }
