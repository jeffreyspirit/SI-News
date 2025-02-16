import GoogleSheet from "@/libs/google/ggsheet";
import Elysia from "elysia";
import { transpose } from "mathjs";

const newsApi = new Elysia({ prefix: "/news" }).get("/", async () => {
  const [header, ...data] = (await GoogleSheet.getData()) as [][];
  return data
    .map((row) => Object.fromEntries(transpose([header, row])))
    .map(({ years, photos, ...other }, index) => ({
      id: index,
      ...other,
      years: years.split(",").map((year: string) => `Year ${year}`),
      photos: photos.split(","),
    }));
});

export default newsApi;
