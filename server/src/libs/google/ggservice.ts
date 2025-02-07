import { google } from "googleapis";

const ggservice = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GGSERVICE_CREDENTIALS as string),
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export default ggservice;
