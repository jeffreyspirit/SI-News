import { useNews } from "@/features/news/hook";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {

  const { data: news } = useNews();

  return (
    <section>
      <h1>NEWS</h1>

      <p>{JSON.stringify(news)}</p>
    </section>
  );
}
