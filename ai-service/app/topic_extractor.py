def extract_topics(text: str):
    text = text.lower()

    topics = []

    keywords = {
        "speaker": ["speaker", "talk", "session"],
        "venue": ["venue", "hall", "place"],
        "crowd": ["crowd", "crowded", "queue"],
        "pricing": ["price", "cost", "expensive"],
        "logistics": ["entry", "check-in", "parking"]
    }

    for topic, words in keywords.items():
        for word in words:
            if word in text:
                topics.append(topic)
                break

    return list(set(topics))
