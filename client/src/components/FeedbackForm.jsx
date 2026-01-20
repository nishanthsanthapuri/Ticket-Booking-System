import { useState } from "react";
import api from "../api/axios";

const FeedbackForm = () => {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await api.post("/ai/feedback", { review });
    setResult(res.data);
  };

  return (
    <div>
      <h3>📝 Feedback</h3>
      <textarea onChange={(e) => setReview(e.target.value)} />
      <button onClick={submit}>Submit</button>

      {result && (
        <p>
          Sentiment: {result.sentiment} | Topics: {result.topics.join(", ")}
        </p>
      )}
    </div>
  );
};

export default FeedbackForm;
