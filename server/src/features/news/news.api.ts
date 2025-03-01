import GoogleSheet from "@/libs/google/ggsheet";
import Elysia from "elysia";

function transpose(arr: any[][]) {
  return arr[0].map((col, i) => arr.map(row => row[i]));
}

const newsApi = new Elysia({ prefix: "/news" }).get("/", async () => {
  const [header, ...data] = (await GoogleSheet.getData()) as string[][];
  return data
    .map((row) => [...row, ...Array(header.length - row.length).fill("")])
    .map((row) => Object.fromEntries(transpose([header, row])))
    .map(({ years, photos, ...other }, index) => ({
      id: index,
      ...other,
      years: years.split(",").map((year: string) => `Year ${year}`),
      photos: photos === "" ? [] : photos.split(","),
    }));
});

export default newsApi;
