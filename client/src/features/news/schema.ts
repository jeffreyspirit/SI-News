import * as v from "valibot";

export const newsFilterSchema = v.object({
  searchQuery: v.string(),
  selectedCategory: v.string(),
  selectedStatus: v.string(),
  selectedYear: v.string(),
});

export type NewsFilter = v.InferOutput<typeof newsFilterSchema>;

export const defaultNewsFilter = {
  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "",
  selectedYear: "",
};

export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  category:
    | "Important"
    | "General"
    | "Invitation"
    | "Recruitment";
  link?: string; // Optional field
  photos: string[]; // Array of images
  years: string[]; // ✅ Multiple selected years (Year 1 - Year 6)
};
