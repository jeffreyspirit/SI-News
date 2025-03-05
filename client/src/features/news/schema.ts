import * as v from "valibot";

export const newsFilterSchema = v.object({
  searchQuery: v.string(),
  selectedCategory: v.string(),
  selectedStatus: v.string(),
  selectedYears: v.array(v.string()), // ✅ Now supports multiple years
});

export type NewsFilter = v.InferOutput<typeof newsFilterSchema>;

export const defaultNewsFilter: NewsFilter = {
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "Active", // ✅ Default to Active
  selectedYears: [], // ✅ Allow multiple years
};

export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  category: "Important" | "General" | "Invitation" | "Recruitment";
  link?: string;
  photos: string[];
  years: string[];
};
