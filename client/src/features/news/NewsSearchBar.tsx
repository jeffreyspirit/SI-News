import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { DeepPartial, useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: DeepPartial<NewsFilter>) => void;
};

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
    defaultValues: initValue,
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => handleFilter(value));
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  return (
    <form className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search news..."
        className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-2/4"
        {...register("searchQuery")}
      />

      <select className="p-2 border rounded-lg w-full sm:w-1/6" {...register("selectedCategory")}>
        <option value="">All Categories</option>
        <option value="Important">Important</option>
        <option value="General">General</option>
        <option value="Invitation">Invitation</option>
        <option value="Recruitment">Recruitment</option>
      </select>

      {/* 🔹 Status Filter (Active/Inactive) */}
      <select
        className="p-2 border rounded-lg w-full sm:w-1/6"
        {...register("selectedStatus")}
      >
        <option value="Active">Active (Default)</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* 🔹 Year Selection (Checkboxes) */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg shadow-sm">
        <input type="checkbox" {...register("selectedYears")} value="Year 1" />
        <label>Year 1</label>
        <input type="checkbox" {...register("selectedYears")} value="Year 2" />
        <label>Year 2</label>
        <input type="checkbox" {...register("selectedYears")} value="Year 3" />
        <label>Year 3</label>
        <input type="checkbox" {...register("selectedYears")} value="Year 4" />
        <label>Year 4</label>
        <input type="checkbox" {...register("selectedYears")} value="Year 5" />
        <label>Year 5</label>
        <input type="checkbox" {...register("selectedYears")} value="Year 6" />
        <label>Year 6</label>
      </div>
    </form>
  );
}

export default NewsSearchBar;
