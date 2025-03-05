import { useState } from "react";
import { NewsArticle, NewsFilter } from "./schema";
import NewsSearchBar from "./NewsSearchBar";
import NewsCard from "./NewsCard";

type NewsListProps = {
  news?: NewsArticle[];
};

function NewsList({ news }: NewsListProps) {
  // ✅ Ensure `newsFilter` is always defined
  const [newsFilter, setNewsFilter] = useState<NewsFilter>({
    searchQuery: "",
    selectedCategory: "",
    selectedStatus: "Active",
    selectedYears: [],
  });

  const { searchQuery, selectedCategory, selectedStatus, selectedYears } = newsFilter;

  // ✅ Filter news based on search, category, status, and years
  const filteredNews = news
    ?.filter(({ title, category, status, years }) => {
      return (
        (!searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!selectedCategory || category === selectedCategory) &&
        (!selectedStatus || status === selectedStatus) &&
        (!selectedYears.length || selectedYears.some((year: string) => years.includes(year)))
      );
    })
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()); // ✅ Sort by newest first

  return (
    <div className="container mx-auto p-4">
      {/* ✅ Search and Filter Bar */}
      <NewsSearchBar initValue={newsFilter} handleFilter={setNewsFilter} />

      {/* ✅ Display News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        {filteredNews?.length ? (
          filteredNews.map((article) => <NewsCard key={article.id} article={article} />)
        ) : (
          <p className="text-center text-gray-500">No news found.</p>
        )}
      </div>
    </div>
  );
}

export default NewsList;
