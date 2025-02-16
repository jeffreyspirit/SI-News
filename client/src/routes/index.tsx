import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useNews } from "@/features/news/hook";
import NewsList from "@/features/news/NewsList";
import NewsSearchBar from "@/features/news/NewsSearchBar";
import { defaultNewsFilter, NewsFilter } from "@/features/news/schema";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const { data: news, isLoading, error } = useNews();

  const [newsFilter, setNewsFilter] = useState<Partial<NewsFilter>>(defaultNewsFilter);
  const { searchQuery, selectedCategory, selectedStatus, selectedYear } =
    newsFilter;

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  const filteredNews = news?.filter(({ title, category, status, years }) => {
    return (
      (!searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || category === selectedCategory) &&
      (!selectedStatus || status === selectedStatus) &&
      (!selectedYear || years.includes(selectedYear))
    );
  });

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📰 Latest News</h1>
      <NewsSearchBar
        initValue={defaultNewsFilter}
        handleFilter={setNewsFilter}
      />
      <NewsList news={filteredNews} />
    </section>
  );
}

export default Page;
