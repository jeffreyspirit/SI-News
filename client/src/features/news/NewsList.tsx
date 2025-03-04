import { useState } from "react";
import NewsCard from "./NewsCard";
import { NewsArticle } from "./schema";

type NewsListProps = {
  articles: NewsArticle[];
};

function NewsList({ articles }: NewsListProps) {
  // 🔹 State to control active/inactive filter
  const [showOnlyActive, setShowOnlyActive] = useState(true);

  // 🔹 Filter active news by default, but allow toggling
  const filteredArticles = articles.filter((article) =>
    showOnlyActive ? article.status === "Active" : true
  );

  // 🔹 Sort articles by publishedDate (latest first)
  const sortedArticles = [...filteredArticles].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="container mx-auto p-4">
      {/* 🔹 Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setShowOnlyActive(!showOnlyActive)}
        >
          {showOnlyActive ? "Show All News" : "Show Only Active News"}
        </button>
      </div>

      {/* 🔹 Render Filtered & Sorted News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedArticles.length > 0 ? (
          sortedArticles.map((article) => (
            <NewsCard key={article.title} article={article} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
            No news available.
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsList;
