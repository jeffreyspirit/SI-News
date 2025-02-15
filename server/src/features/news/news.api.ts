import GoogleSheet from "@/libs/google/ggsheet";
import Elysia from "elysia";
import { mockNews } from "./news.mock";

const newsApi = new Elysia({ prefix: "/news" }).get("/", () => mockNews);

export default newsApi;
