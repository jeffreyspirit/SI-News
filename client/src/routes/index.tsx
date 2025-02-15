/* import { useNews } from "@/features/news/hook";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {

  const { data: news } = useNews();

  return (
    <section>
      <h1>Update NEWS</h1>

      <p>{JSON.stringify(news)}</p>
    </section>
  );
}
 */

import { useState } from "react";
import { useNews } from "@/features/news/hook";
import { createFileRoute } from "@tanstack/react-router";
import NewsCard from "@/features/news/NewsCard";
import Header from "@/layout/Header";  // ✅ Import Header
import Footer from "@/layout/Footer";  // ✅ Import Footer

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const { news = [] } = useNews();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Get unique filters
  const types = Array.from(new Set(news.map((article) => article.type)));
  const statuses = ["Active", "Inactive"];
  const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];

  // Filter News
  const filteredNews = news.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || article.type === selectedType) &&
      (selectedStatus === "" || article.status === selectedStatus) &&
      (selectedYear === "" || article.year.includes(selectedYear))
    );
  });

  return (
    <>
      <Header /> {/* ✅ Added Header */}
      
      <section className="p-6 bg-gray-100 min-h-screen pt-20"> {/* Add padding to avoid header overlap */}
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

          {/* Type Filter Dropdown */}
          <select
            className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Status Filter Dropdown */}
          <select
            className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Year Filter Dropdown */}
          <select
            className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* News Cards Grid */}
        {filteredNews.length === 0 ? (
          <p className="text-center text-gray-500">No news found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      <Footer /> {/* ✅ Added Footer */}
    </>
  );
}

export default Page;
