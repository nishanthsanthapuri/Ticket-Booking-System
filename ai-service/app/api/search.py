# from fastapi import APIRouter
# from app.search_schema import SearchRequest
# from app.nlp_parser import parse_search_query
# from app.embedding_service import embed_text, cosine_similarity
# from app.mock_events import MOCK_EVENTS

# router = APIRouter()

# @router.post("/")
# def search_events(payload: SearchRequest):
#     parsed_filters = parse_search_query(payload.query)

#     query_embedding = embed_text(payload.query)

#     ranked_events = []

#     for event in MOCK_EVENTS:
#         event_text = f"{event['title']} {event['description']}"
#         event_embedding = embed_text(event_text)

#         score = cosine_similarity(query_embedding, event_embedding)

#         ranked_events.append({
#             "event": event,
#             "score": score
#         })

#     ranked_events.sort(key=lambda x: x["score"], reverse=True)

#     return {
#         "parsed_filters": parsed_filters,
#         "results": ranked_events
#     }
from fastapi import APIRouter
from app.search_schema import SearchRequest
from app.nlp_parser import parse_search_query
from app.embedding_service import embed_text, cosine_similarity
from app.mock_events import MOCK_EVENTS

router = APIRouter()

@router.post("/")
def search_events(payload: SearchRequest):
    parsed_filters = parse_search_query(payload.query)

    query_embedding = embed_text(payload.query)

    ranked_events = []

    for event in MOCK_EVENTS:
        event_text = f"{event['title']} {event['description']}"
        event_embedding = embed_text(event_text)

        score = cosine_similarity(query_embedding, event_embedding)

        ranked_events.append({
            "event": event,
            "score": score
        })

    ranked_events.sort(key=lambda x: x["score"], reverse=True)

    return {
        "parsed_filters": parsed_filters,
        "results": ranked_events
    }
