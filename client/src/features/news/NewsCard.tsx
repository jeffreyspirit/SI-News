import { useRef, useEffect, useState } from "react";
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

  // Modal control state
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open modal & store the correct data
  const openModal = () => {
    if (dialogRef.current) {
      setIsOpen(true);
      dialogRef.current.showModal();
    }
  };

  // Close modal function
  const closeModal = () => {
    if (dialogRef.current) {
      setIsOpen(false);
      dialogRef.current.close();
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && event.target instanceof Node && !dialogRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 transition-transform hover:scale-105 hover:shadow-lg p-3">
      {/* Display first image (or default placeholder if none) */}
      <img
        src={photos.length > 0 ? photos[0] : emptyImage}
        alt={title}
        className="w-full h-40 object-cover rounded"
      />

      <div className="p-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h2>

        {/* Status & Type Tags */}
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

        {/* Shortened Description */}
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          {description.slice(0, 60)}...
        </p>

        {/* Read More Button (Opens Modal) */}
        <button
          className="mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            openModal();
          }}
        >
          Read More
        </button>

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
          <strong>Ends:</strong> {endDate}
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

      {/* Modal Popup for Full Description */}
      {isOpen && (
        <dialog
          ref={dialogRef}
          className="fixed inset-0 flex items-center justify-center p-5 bg-black bg-opacity-50"
          onClick={(e) => e.stopPropagation()} // Prevent outside clicks from closing instantly
        >
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default NewsCard;
