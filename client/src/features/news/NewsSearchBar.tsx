import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: Partial<NewsFilter>) => void;
};

const availableYears: number[] = [1, 2, 3, 4, 5, 6];

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset, setValue } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      // ✅ Ensure selectedYears is always an array of numbers
      const selectedYears = (value.selectedYears || []).map(Number);
      handleFilter({ ...value, selectedYears });
    });

    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  return (
    <form className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
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
        <option value="">All Status</option>
      </select>

      {/* ✅ Year Selection (Checkboxes) */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg shadow-sm">
        {availableYears.map((year) => (
          <label key={year} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={year}
              {...register("selectedYears")}
              onChange={(e) => {
                const checked = e.target.checked;
                const value = Number(e.target.value);
                setValue(
                  "selectedYears",
                  checked
                    ? [...(initValue.selectedYears || []), value]
                    : (initValue.selectedYears || []).filter((y) => y !== value)
                );
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 dark:text-gray-300">Year {year}</span>
          </label>
        ))}
      </div>
    </form>
  );
}

export default NewsSearchBar;
