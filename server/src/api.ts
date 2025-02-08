import Elysia from "elysia";
import newsApi from "./features/news/news.api";

const api = new Elysia({ prefix: "/api" })
  .use(newsApi)
;

export default api;