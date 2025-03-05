import * as v from "valibot";

export const newsFilterSchema = v.object({
  searchQuery: v.string(),
  selectedCategory: v.string(),
  selectedStatus: v.string(),
  selectedYears: v.array(v.string()),
});

export type NewsFilter = v.InferOutput<typeof newsFilterSchema>;

export const defaultNewsFilter: NewsFilter = {
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "Active",
  selectedYears: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
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
