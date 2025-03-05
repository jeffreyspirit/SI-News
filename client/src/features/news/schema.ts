import * as v from "valibot";

// ✅ Ensure `selectedYears` is an array of **numbers**, not strings
export const newsFilterSchema = v.object({
  searchQuery: v.string(),
  selectedCategory: v.string(),
  selectedStatus: v.string(),
  selectedYears: v.array(v.number()), // ✅ Change from `string` to `number`
});

// ✅ Correctly define the type for filtering
export type NewsFilter = {
  searchQuery?: string;
  selectedCategory?: string;
  selectedStatus?: "Active" | "Inactive" | "";
  selectedYears?: number[]; // ✅ Ensure this is always a number[]
};

// ✅ Fix `years` Type in `NewsArticle`
export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  endDate?: string;
  status: "Active" | "Inactive";
  category: "Important" | "General" | "Invitation" | "Recruitment";
  link?: string;
  photos: string[];
  years: number[]; // ✅ Change from `string[]` to `number[]`
};
