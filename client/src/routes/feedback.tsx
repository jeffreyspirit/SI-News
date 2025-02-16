import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you for your feedback!\nRating: ${rating} stars\nComment: ${comment}`
    );
    setRating(0);
    setComment("");
  };

  return (
    <section className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          ⭐ Feedback
        </h1>
        <p className="mt-4 text-gray-700 text-lg text-center">
          We value your feedback! Please rate your experience and leave a
          comment.
        </p>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Star Rating */}
          <div className="text-center">
            <p className="text-lg font-medium">Rate Us</p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-3xl cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-gray-700 font-medium">
              Your Feedback
            </label>
            <textarea
              placeholder="Write your feedback here..."
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            disabled={rating === 0 || comment.trim() === ""}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default FeedbackPage;
