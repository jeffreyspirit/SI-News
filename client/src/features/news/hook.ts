import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => axios.get("/api/news").then((res) => res.data),
  });
}
