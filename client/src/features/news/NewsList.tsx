import { NewsArticle } from "./schema";
import NewsCard from "./NewsCard";

type NewsListProps = {
  news?: NewsArticle[];
};

function NewsList({ news }: NewsListProps) {
  if (!news) return <p className="text-center text-gray-500">No news found.</p>;

  if (news.length <= 0)
    return (
      <p className="container mx-auto p-4 text-gray-500 dark:text-gray-400 text-center col-span-full">
        No news available.
      </p>
    );

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {news.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
