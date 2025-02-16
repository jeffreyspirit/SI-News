export const mockNews = [
  {
    id: 1,
    title: "New AI Course Registration Open!",
    description:
      "Sign up now for our advanced AI training program. This course covers deep learning, natural language processing, and real-world AI applications...",
    publishedDate: "2025-02-10",
    endDate: "2025-02-20",
    status: "Active",
    category: "Recruitment",
    link: "https://example.com/register",
    photos: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
    ],
    years: ["Year 1", "Year 2", "Year 3"], // ✅ Assigned multiple years
  },
  {
    id: 2,
    title: "Important: Policy Update",
    description:
      "New company policies will be effective from March 1st. This update includes changes to work-from-home policies, security protocols, and employee benefits...",
    publishedDate: "2025-02-15",
    endDate: "2025-03-01",
    status: "Inactive",
    category: "Important",
    photos: ["https://via.placeholder.com/600x400"],
    years: ["Year 4", "Year 5"], // ✅ Assigned multiple years
  },
];
