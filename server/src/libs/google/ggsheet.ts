import { google } from "googleapis";
import ggservice from "./ggservice";

const ggsheet = google.sheets({
  auth: ggservice,
  version: "v4",
});

class GoogleSheet {
  static async getData() {
    const {
      data: { values },
    } = await ggsheet.spreadsheets.values.get({
      spreadsheetId: process.env.GGSHEET_SPREADSHEETID,
      range: "Sheet1",
    });

    return values;
  }
}

export default GoogleSheet;
