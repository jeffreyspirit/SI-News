import * as v from "valibot";

export const newsFilterSchema = v.object({
  searchQuery: v.string().default(""),
  selectedCategory: v.string().default(""),
  selectedStatus: v.string().default("Active"), // ✅ Default Active
  selectedYears: v.array(v.string()).default([]), // ✅ Ensure it's always an array
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
