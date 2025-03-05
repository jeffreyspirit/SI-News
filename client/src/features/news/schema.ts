import * as v from "valibot";

// ✅ Update News Filter Schema to use `selectedYears` (array of strings)
export const newsFilterSchema = v.object({
  searchQuery: v.string(),
  selectedCategory: v.string(),
  selectedStatus: v.string(),
  selectedYears: v.array(v.string()), // ✅ Changed from single string to array of strings
});

// ✅ Updated Type for Filtering
export type NewsFilter = v.InferOutput<typeof newsFilterSchema>;

// ✅ Updated Default Filter
export const defaultNewsFilter: NewsFilter = {
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "Active", // Default to Active
  selectedYears: [], // ✅ Use an empty array for multiple years
};

// ✅ Fix `years` Type in `NewsArticle`
export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  category: "Important" | "General" | "Invitation" | "Recruitment";
  link?: string; // Optional field
  photos: string[]; // Array of images
  years: number[]; // ✅ Change from `string[]` to `number[]` for easier filtering
};
