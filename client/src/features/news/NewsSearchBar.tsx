import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: Partial<NewsFilter>) => void;
};

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset, setValue } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
  });

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      // ✅ Convert selected years from string to an array of numbers
      const yearsArray = value.selectedYears
        ? (Array.isArray(value.selectedYears) ? value.selectedYears : [value.selectedYears])
            .map((year) => Number(year)) // Convert strings to numbers
        : [];

      handleFilter({ ...value, selectedYears: yearsArray });
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

      {/* 🔹 Multi-Select Year Fix */}
      <div className="relative w-full sm:w-1/6">
        <select
          multiple
          {...register("selectedYears")}
          className="p-2 border rounded-lg w-full h-32"
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (option) => Number(option.value));
            setValue("selectedYears", values);
          }}
        >
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
          <option value="5">Year 5</option>
          <option value="6">Year 6</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold **Ctrl (Cmd on Mac)** to select multiple years.</p>
      </div>
    </form>
  );
}

export default NewsSearchBar;
