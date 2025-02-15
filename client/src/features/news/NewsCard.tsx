import { useState } from "react";
import { NewsArticle } from "@/libs/mock/newsMock";

type NewsCardProps = {
  article: NewsArticle;
};

function NewsCard({ article }: NewsCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 transition-transform hover:scale-105 hover:shadow-lg p-3">
      {/* Display first image (or default placeholder if none) */}
      <img
        src={article.photos[0] || "https://via.placeholder.com/400x250"}
        alt={article.title}
        className="w-full h-40 object-cover rounded"
      />

      <div className="p-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{article.title}</h2>

        {/* Status & Type Tags */}
        <div className="flex gap-2 mt-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              article.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {article.status}
          </span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
            {article.type}
          </span>
        </div>

        {/* Description (Shortened) */}
        <p className="text-gray-600 mt-2 text-sm">
          {showFullDescription
            ? article.description
            : `${article.description.slice(0, 60)}...`}
        </p>
        <button
          className="text-blue-600 hover:underline text-xs"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Read Less" : "Read More"}
        </button>

        {/* Year Tags */}
        <div className="flex gap-2 mt-2">
          {article.year.map((y) => (
            <span key={y} className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-600">
              {y}
            </span>
          ))}
        </div>

        {/* Dates */}
        <p className="text-xs text-gray-500 mt-3">
          📅 <strong>Published:</strong> {article.publishedDate} <br />
          ⏳ <strong>Ends:</strong> {article.endDate}
        </p>

        {/* Link Button (Only if Available) */}
        {article.link && (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-center bg-blue-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700 transition w-full"
          >
            Open Link
          </a>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
