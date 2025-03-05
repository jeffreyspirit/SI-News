import { useState } from "react";
import { NewsArticle, NewsFilter } from "./schema";
import NewsCard from "./NewsCard";
import NewsSearchBar from "./NewsSearchBar";

type NewsListProps = {
  news?: NewsArticle[];
};

function NewsList({ news }: NewsListProps) {
  if (!news) return <p className="text-center text-gray-500">No news found.</p>;

  // ✅ Ensure Correct Types
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<"Active" | "Inactive" | "">("Active");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);

  // ✅ Fix: Use `Partial<NewsFilter>` instead of `Partial<NewsArticle>`
  const handleFilter = (data: Partial<NewsFilter>) => {
    setSearchQuery(data.searchQuery || "");
    setSelectedCategory(data.selectedCategory || "");
    setSelectedStatus(data.selectedStatus || "Active");

    // ✅ Ensure `selectedYears` is always an array of numbers
    setSelectedYears((data.selectedYears || []).map(Number));
  };

  // ✅ Debugging: Check if `selectedYears` contains correct values
  console.log("Selected Years: ", selectedYears);

  // ✅ Apply filtering
  const filteredNews = news.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "" || article.status === selectedStatus;

    // ✅ Multi-Select Year Filtering (Checkbox OR Logic)
    const matchesYear =
      selectedYears.length === 0 ||
      article.years.some((year) => selectedYears.includes(year));

    return matchesSearch && matchesCategory && matchesStatus && matchesYear;
  });

  // ✅ Sort by publishedDate (latest first)
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Search and Filter Bar */}
      <NewsSearchBar
        initValue={{
          searchQuery,
          selectedCategory,
          selectedStatus,
          selectedYears,
        }}
        handleFilter={handleFilter}
      />

      {/* ✅ Render Filtered & Sorted News */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
