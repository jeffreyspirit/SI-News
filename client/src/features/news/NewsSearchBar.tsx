import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useState } from "react";
import { DeepPartial, useForm, Controller } from "react-hook-form";
import Select, { MultiValue, SingleValue } from "react-select";
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
      {/* 🔹 Search Bar with Filter Button (Filter on Right) */}
      <form className="my-6 grid grid-cols-6 gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3">
        {/* 🔹 Search Bar (5/6 width, Left Side) */}
        <input
          type="text"
          placeholder="🔎 Search news..."
          className="p-2 border rounded-lg col-span-5 w-full"
          {...register("searchQuery")}
        />
    
        {/* 🔹 Filter Button (1/6 width, Right Side) */}
        <button
          type="button"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition col-span-1"
          onClick={() => setIsFilterOpen(true)}
        >
          ⚙️ Filter
        </button>
      </form>


      {/* 🔹 Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
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
                  <Select<SelectOption, false>
                    {...field}
                    options={categoryOptions}
                    classNamePrefix="select"
                    placeholder="Select Category"
                    value={categoryOptions.find((opt) => opt.value === field.value)}
                    onChange={(selectedOption: SingleValue<SelectOption>) => {
                      field.onChange(selectedOption?.value || "");
                    }}
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
                  <Select<SelectOption, false>
                    {...field}
                    options={statusOptions}
                    classNamePrefix="select"
                    placeholder="Select Status"
                    value={statusOptions.find((opt) => opt.value === field.value)}
                    onChange={(selectedOption: SingleValue<SelectOption>) => {
                      field.onChange(selectedOption?.value || "");
                    }}
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
                  <Select<SelectOption, true> // ✅ Explicitly set isMulti as true
                    {...field}
                    options={yearOptions}
                    isMulti={true}
                    classNamePrefix="select"
                    placeholder="Select Years"
                    closeMenuOnSelect={false}
                    value={yearOptions.filter((opt) => field.value?.includes(opt.value))}
                    onChange={(selectedOptions: MultiValue<SelectOption>) => {
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
