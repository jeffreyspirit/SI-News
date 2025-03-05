import { createFileRoute } from "@tanstack/react-router";
import { useNews } from "@/features/news/hook";
import NewsList from "@/features/news/NewsList";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const { data: news, isLoading, error } = useNews();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📰 Latest News</h1>
      <NewsList news={news} /> {/* ✅ Pass only the raw news */}
    </section>
  );
}

export default Page;
