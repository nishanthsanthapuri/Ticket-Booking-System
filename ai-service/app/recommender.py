from app.embedding_service import embed_text, cosine_similarity

def recommend_events(user_profile, events):
    recommendations = []

    user_text = f"{user_profile.get('preferred_category', '')} {user_profile.get('preferred_city', '')}"
    user_embedding = embed_text(user_text)

    for event in events:
        event_text = f"{event['title']} {event['description']}"
        event_embedding = embed_text(event_text)

        score = cosine_similarity(user_embedding, event_embedding)

        recommendations.append({
            "event": event,
            "score": score
        })

    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations
