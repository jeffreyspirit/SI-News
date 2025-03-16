import { useState } from "react";
import { NewsArticle } from "./schema";
import emptyImage from "@/assets/empty.jpg";

type NewsCardProps = {
  article: NewsArticle;
};

function NewsCard({ article }: NewsCardProps) {
  const {
    photos,
    title,
    category,
    status,
    description,
    years,
    publishedDate,
    endDate,
    link,
  } = article;

  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Function to detect and format links inside the description
  const formatDescription = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-600 transition"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <>
      {/* News Item Card */}
      <div
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-300 dark:border-gray-700 transition-transform hover:scale-105 hover:shadow-lg p-4 flex flex-col h-full cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Display first image (or default placeholder if none) */}
        <img
          src={photos.length > 0 ? photos[0] : emptyImage}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-40 object-cover rounded"
        />

        <div className="p-3 flex flex-col flex-grow">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h2>

          {/* Status & Category Tags */}
          <div className="flex gap-2 mt-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                status === "Active"
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {status}
            </span>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              {category}
            </span>
          </div>

          {/* Shortened Description with Underlined Links */}
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm flex-grow">
            {formatDescription(description.slice(0, 100))}...
          </p>

          {/* Read More as Underlined Text */}
          <p
            className="mt-2 text-blue-500 underline cursor-pointer hover:text-blue-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Read More
          </p>

          {/* Year Tags */}
          <div className="flex gap-2 mt-2">
            {years.map((year) => (
              <span
                key={year}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
              >
                {year}
              </span>
            ))}
          </div>

          {/* Dates */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            📅 <strong>Published:</strong> {publishedDate} <br />⏳{" "}
            <strong>Ends:</strong> {endDate || "Ongoing"}
          </p>

          {/* Link Button (Only if Available) */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-center bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition w-full"
            >
              Open Link
            </a>
          )}
        </div>
      </div>

      {/* 🔹 Responsive, Scrollable Flexbox-Based Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 text-2xl hover:text-gray-800 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {formatDescription(description)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsCard;
