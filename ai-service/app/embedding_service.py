# from sentence_transformers import SentenceTransformer
# import numpy as np

# # Load model once (important for performance)
# model = SentenceTransformer("all-MiniLM-L6-v2")

# def embed_text(text: str):
#     embedding = model.encode(text)
#     return embedding.tolist()

# def cosine_similarity(vec1, vec2):
#     v1 = np.array(vec1)
#     v2 = np.array(vec2)

#     return float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))
from app.core.model_loader import get_model
import numpy as np

def embed_text(text: str):
    model = get_model()
    embedding = model.encode(text)
    return embedding

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return float(
        np.dot(vec1, vec2) /
        (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    )
