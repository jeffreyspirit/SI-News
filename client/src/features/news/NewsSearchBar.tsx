import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: Partial<NewsFilter>) => void;
};

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => handleFilter(value));
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  return (
    <form className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Search news..."
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-2/4"
        {...register("searchQuery")}
      />

      <select
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
        {...register("selectedCategory")}
      >
        <option value="">All Category</option>
        <option value="Important">Important</option>
        <option value="General">General</option>
        <option value="Invitation">Invitation</option>
        <option value="Recruitment">Recruitment</option>
      </select>

      <select
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
        {...register("selectedStatus")}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
        {...register("selectedYear")}
      >
        <option value="">All Years</option>
        <option value="Year 1">Year 1</option>
        <option value="Year 2">Year 2</option>
        <option value="Year 3">Year 3</option>
        <option value="Year 4">Year 4</option>
        <option value="Year 5">Year 5</option>
        <option value="Year 6">Year 6</option>
      </select>
    </form>
  );
}

export default NewsSearchBar;
