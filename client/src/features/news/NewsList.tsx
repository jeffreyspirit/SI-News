import { useState } from "react";
import { NewsArticle } from "./schema";
import NewsCard from "./NewsCard";
import NewsSearchBar from "./NewsSearchBar";

type NewsListProps = {
  news?: NewsArticle[];
};

function NewsList({ news }: NewsListProps) {
  if (!news) return <p className="text-center text-gray-500">No news found.</p>;

  // 🔹 State for filtering
  const [showOnlyActive, setShowOnlyActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Active"); // Default to Active
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // 🔹 Handle filter changes from NewsSearchBar
  const handleFilter = (data: Partial<NewsArticle>) => {
    setSearchQuery(data.searchQuery || "");
    setSelectedCategory(data.selectedCategory || "");
    setSelectedStatus(data.selectedStatus || "Active");
    setSelectedYears(data.selectedYears || []);
  };

  // 🔹 Apply filters
  const filteredNews = news.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "" || article.status === selectedStatus;

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => article.years.includes(Number(year)));

    return matchesSearch && matchesCategory && matchesStatus && matchesYear;
  });

  // 🔹 Sort articles by publishedDate (latest first)
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="container mx-auto p-4">
      {/* 🔹 Search & Filter Bar */}
      <NewsSearchBar
        initValue={{
          searchQuery,
          selectedCategory,
          selectedStatus,
          selectedYears,
        }}
        handleFilter={handleFilter}
      />

      {/* 🔹 Toggle Active/Inactive */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setShowOnlyActive(!showOnlyActive)}
        >
          {showOnlyActive ? "Show All News" : "Show Only Active News"}
        </button>
      </div>

      {/* 🔹 Render Filtered & Sorted News */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sortedNews.length > 0 ? (
          sortedNews.map((article) => (
            <NewsCard key={article.id} article={article} />
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
