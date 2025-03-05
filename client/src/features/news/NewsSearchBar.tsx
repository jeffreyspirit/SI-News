import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: NewsFilter) => void;
};

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset, setValue } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
    defaultValues: initValue,
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      handleFilter({
        ...value,
        selectedYears: value.selectedYears?.filter(Boolean) || [], // ✅ Remove undefined values
      });
    });
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  const availableYears = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];

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

      <select className="p-2 border rounded-lg w-full sm:w-1/6" {...register("selectedStatus")}>
        <option value="Active">Active (Default)</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* ✅ Multi-year selection (Checkboxes) */}
      <div className="flex flex-wrap gap-3">
        {availableYears.map((year) => (
          <label key={year} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={year}
              {...register("selectedYears")}
              onChange={(e) => {
                const checked = e.target.checked;
                setValue(
                  "selectedYears",
                  checked
                    ? [...(watch("selectedYears") || []), year] // Add year if checked
                    : (watch("selectedYears") || []).filter((y) => y !== year) // Remove if unchecked
                );
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 dark:text-gray-300">{year}</span>
          </label>
        ))}
      </div>
    </form>
  );
}

export default NewsSearchBar;
