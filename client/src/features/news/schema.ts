import * as v from "valibot";

export const newsFilterSchema = v.object({
  searchQuery: v.optional(v.string()),
  selectedCategory: v.optional(v.string()),
  selectedStatus: v.optional(v.string()),
  selectedYears: v.optional(v.array(v.string())), // ✅ Fixes array type
});

export type NewsFilter = v.InferOutput<typeof newsFilterSchema>;

export const defaultNewsFilter: NewsFilter = {
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "Active",
  selectedYears: [],
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
