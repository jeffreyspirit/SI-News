import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useNews() {
    return useQuery({
        queryKey: ["news"],
        queryFn: async () => {
            const res = await axios.get("/api/news");
            return res.data;
        }
    });
}