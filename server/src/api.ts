import Elysia from "elysia";
import GoogleSheet from "./libs/google/ggsheet";

const api = new Elysia({ prefix: "/api" })
  .get("/", () => GoogleSheet.getData())
;

export default api;