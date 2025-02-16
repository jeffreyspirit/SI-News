import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NewsArticle } from "./type";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => axios.get<NewsArticle[]>("/api/news").then((res) => res.data),
  });
}
