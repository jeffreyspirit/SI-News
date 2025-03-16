import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useState } from "react";
import { DeepPartial, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: DeepPartial<NewsFilter>) => void;
};

type SelectOption = { value: string; label: string };

const categoryOptions: SelectOption[] = [
  { value: "", label: "All Categories" },
  { value: "Important", label: "Important" },
  { value: "General", label: "General" },
  { value: "Invitation", label: "Invitation" },
  { value: "Recruitment", label: "Recruitment" },
];

const statusOptions: SelectOption[] = [
  { value: "Active", label: "Active (Default)" },
  { value: "Inactive", label: "Inactive" },
];

const yearOptions: SelectOption[] = [
  { value: "Year 1", label: "Year 1" },
  { value: "Year 2", label: "Year 2" },
  { value: "Year 3", label: "Year 3" },
  { value: "Year 4", label: "Year 4" },
  { value: "Year 5", label: "Year 5" },
  { value: "Year 6", label: "Year 6" },
];

function NewsSearchBar({ initValue, handleFilter }: NewsSearchBarProps) {
  const { register, watch, reset, control } = useForm<NewsFilter>({
    resolver: valibotResolver(newsFilterSchema),
    defaultValues: initValue,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const { unsubscribe } = watch((value) => handleFilter(value));
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  return (
    <>
      {/* 🔹 Search Bar with Filter Button */}
      <form className="my-6 flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3">
        <input
          type="text"
          placeholder="🔎 Search news..."
          className="p-2 border rounded-lg w-full md:w-60"
          {...register("searchQuery")}
        />

        {/* Filter Button */}
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsFilterOpen(true)}
        >
          ⚙️ Filter
        </button>
      </form>

      {/* 🔹 Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xl"
              onClick={() => setIsFilterOpen(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Filter News</h2>

            {/* 🔹 Category Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <Controller
                name="selectedCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categoryOptions}
                    classNamePrefix="select"
                    placeholder="Select Category"
                  />
                )}
              />
            </div>

            {/* 🔹 Status Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <Controller
                name="selectedStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statusOptions}
                    classNamePrefix="select"
                    placeholder="Select Status"
                  />
                )}
              />
            </div>

            {/* 🔹 Multi-Select Year Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Years
              </label>
              <Controller
                name="selectedYears"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={yearOptions}
                    isMulti
                    classNamePrefix="select"
                    placeholder="Select Years"
                    closeMenuOnSelect={false}
                    value={yearOptions.filter(option => field.value?.includes(option.value))}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions.map((opt) => opt.value));
                    }}
                  />
                )}
              />
            </div>

            {/* 🔹 Apply Filter Button */}
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsSearchBar;
