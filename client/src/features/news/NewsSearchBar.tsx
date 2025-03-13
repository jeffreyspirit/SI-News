import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { DeepPartial, useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";
// import { Icon } from "@iconify/react";

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
    <form className="my-6 grid md:grid-cols-[1fr_auto_auto] gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search news..."
        className="p-2 border rounded-lg"
        {...register("searchQuery")}
      />

      <select
        className="p-2 border rounded-lg"
        {...register("selectedCategory")}
      >
        <option value="">All Categories</option>
        <option value="Important">Important</option>
        <option value="General">General</option>
        <option value="Invitation">Invitation</option>
        <option value="Recruitment">Recruitment</option>
      </select>

      {/* 🔹 Status Filter (Active/Inactive) */}
      <select
        className="p-2 border rounded-lg"
        {...register("selectedStatus")}
      >
        <option value="Active">Active (Default)</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* 🔹 Year Selection (Checkboxes) */}
      <div className="w-full md:col-span-3 grid grid-cols-3 md:grid-cols-6 p-2 bg-white border rounded-lg">
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 1"
          />
          <label>Year 1</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 2"
          />
          <label>Year 2</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 3"
          />
          <label>Year 3</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 4"
          />
          <label>Year 4</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 5"
          />
          <label>Year 5</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="me-2"
            {...register("selectedYears")}
            value="Year 6"
          />
          <label>Year 6</label>
        </div>
      </div>
    </form>
  );
}

export default NewsSearchBar;
