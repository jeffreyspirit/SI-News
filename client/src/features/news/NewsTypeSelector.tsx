import { ChangeEventHandler } from "react";
import { NewsArticle } from "./type";

type NewsTypeSelectorProps = {
  news?: NewsArticle[];
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
};

function NewsTypeSelector({
  news,
  value,
  handleChange,
}: NewsTypeSelectorProps) {
  const newsTypes = Array.from(new Set(news?.map((article) => article.type)));

  return (
    <select
      className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
      value={value}
      onChange={handleChange}
    >
      <option value="">All Types</option>

      {newsTypes.map((newsType) => (
        <option key={newsType} value={newsType}>
          {newsType}
        </option>
      ))}
    </select>
  );
}

export default NewsTypeSelector;
