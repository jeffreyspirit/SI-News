import { ChangeEventHandler } from "react";

type YearSelectorProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
};

function YearSelector({ value, handleChange }: YearSelectorProps) {
  return (
    <select
      className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
      value={value}
      onChange={handleChange}
    >
      <option value="">All Years</option>
      <option value="Year 1">Year 1</option>
      <option value="Year 2">Year 2</option>
      <option value="Year 3">Year 3</option>
      <option value="Year 4">Year 4</option>
      <option value="Year 5">Year 5</option>
      <option value="Year 6">Year 6</option>
    </select>
  );
}

export default YearSelector;
