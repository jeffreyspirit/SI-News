import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useNews } from "@/features/news/hook";
import YearSelector from "@/features/news/YearSelector";
import StatusSelector from "@/features/news/StatusSelector";
import NewsTypeSelector from "@/features/news/NewsTypeSelector";
import NewsList from "@/features/news/NewsList";
import { NewsArticle } from "@/features/news/type";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const { data: news, isLoading } = useNews();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  if (isLoading) return <h1>Loading...</h1>;

  // Filter News
  const filteredNews = news.filter((article: NewsArticle) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || article.type === selectedType) &&
      (selectedStatus === "" || article.status === selectedStatus) &&
      (selectedYear === "" || article.year.includes(selectedYear))
    );
  });

  return (
    <section className="p-6">
      {/* Add padding to avoid header overlap */}
      <h1 className="text-3xl font-bold text-center mb-6">📰 Latest News</h1>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search news..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-2/4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <NewsTypeSelector
          news={news}
          value={selectedType}
          handleChange={(e) => setSelectedType(e.target.value)}
        />

        <StatusSelector
          value={selectedStatus}
          handleChange={(e) => setSelectedStatus(e.target.value)}
        />

        <YearSelector
          value={selectedYear}
          handleChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      <NewsList news={filteredNews} />
    </section>
  );
}

export default Page;
