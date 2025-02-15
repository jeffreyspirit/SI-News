export type NewsArticle = {
  id: number;
  title: string;
  description: string;
  publishedDate: string;
  endDate: string;
  status: "Active" | "Inactive";
  type: "Registration" | "Important" | "General" | "Invitation" | "Recruitment";
  link?: string; // Optional field
  photos: string[]; // Array of images
  year: string[]; // ✅ Multiple selected years (Year 1 - Year 6)
};
