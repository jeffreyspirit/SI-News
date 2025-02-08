import GoogleSheet from "@/libs/google/ggsheet";
import Elysia from "elysia";

const newsApi = new Elysia({ prefix: "/news" }).get("/", () =>
  GoogleSheet.getData()
);

export default newsApi;