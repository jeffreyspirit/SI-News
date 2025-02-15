import { NewsArticle } from "./type";
import NewsCard from "./NewsCard";

type NewsListProps = {
  news?: NewsArticle[];
};

function NewsList({ news }: NewsListProps) {
  if (!news) return <p className="text-center text-gray-500">No news found.</p>;
  else
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    );
}

export default NewsList;
