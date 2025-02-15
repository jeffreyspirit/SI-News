import { ChangeEventHandler } from "react";

type StatusSelectorProps = {
  value: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
};

function StatusSelector({ value, handleChange }: StatusSelectorProps) {
  return (
    <select
      className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full sm:w-1/6"
      value={value}
      onChange={handleChange}
    >
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  );
}

export default StatusSelector;
