import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "react";
import { DeepPartial, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { newsFilterSchema, NewsFilter } from "./schema";

type NewsSearchBarProps = {
  initValue: NewsFilter;
  handleFilter: (data: DeepPartial<NewsFilter>) => void;
};

type SelectOption = { value: string; label: string };

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

  useEffect(() => {
    const { unsubscribe } = watch((value) => handleFilter(value));
    return () => unsubscribe();
  }, [watch]);

  useEffect(() => {
    reset(initValue);
  }, [initValue]);

  return (
    <form className="my-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* 🔹 Search Input (Smaller Width) */}
      <input
        type="text"
        placeholder="🔎 Search news..."
        className="p-2 border rounded-lg w-60"
        {...register("searchQuery")}
      />

      {/* 🔹 Category Selection */}
      <select className="p-2 border rounded-lg w-40" {...register("selectedCategory")}>
        <option value="">All Categories</option>
        <option value="Important">Important</option>
        <option value="General">General</option>
        <option value="Invitation">Invitation</option>
        <option value="Recruitment">Recruitment</option>
      </select>

      {/* 🔹 Status Selection */}
      <select className="p-2 border rounded-lg w-40" {...register("selectedStatus")}>
        <option value="Active">Active (Default)</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* 🔹 Multi-Select Dropdown for Year Selection */}
      <div className="w-52">
        <Controller
          name="selectedYears"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={yearOptions}
              isMulti
              className="basic-multi-select"
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
    </form>
  );
}

export default NewsSearchBar;
