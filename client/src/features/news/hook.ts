/* import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useNews() {
    return useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const res = await axios.get("/api/news");
            return res.data;
        }
    });
} */


    import { useEffect, useState } from "react";
    import { fetchNews, NewsArticle } from "@/libs/mock/newsMock"; // ✅ Correct import
    
    export function useNews() {
      const [news, setNews] = useState<NewsArticle[]>([]);
    
      useEffect(() => {
        fetchNews()
          .then((data) => setNews(data))
          .catch((error) => console.error("Failed to fetch news:", error)); // Handle error
      }, []);
    
      return { news };
    }
    