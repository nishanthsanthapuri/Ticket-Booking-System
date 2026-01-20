def analyze_sentiment(text: str) -> str:
    text = text.lower()

    positive_words = ["good", "great", "awesome", "excellent", "amazing", "nice"]
    negative_words = ["bad", "poor", "worst", "crowded", "boring", "delay"]

    score = 0

    for word in positive_words:
        if word in text:
            score += 1

    for word in negative_words:
        if word in text:
            score -= 1

    if score > 0:
        return "POSITIVE"
    elif score < 0:
        return "NEGATIVE"
    else:
        return "NEUTRAL"
