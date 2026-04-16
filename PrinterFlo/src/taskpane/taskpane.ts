/// <reference types="office-js" />

import { excelDateToJSDate, excelTimeToString } from "../utils/helpers";
import { LabelData } from "./interfaces";

// Get Active row
export async function getRowWithHeaders(): Promise<Partial<LabelData>> {
  const r = await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();

    const selectedRange = context.workbook.getSelectedRange();
    const usedRange = sheet.getUsedRange();

    selectedRange.load(["rowIndex", "rowCount"]);
    usedRange.load("columnCount");

    await context.sync();

    // Ensure only one row is selected
    if (selectedRange.rowCount !== 1) {
      throw new Error("Please select exactly one row.");
    }

    const rowIndex = selectedRange.rowIndex;
    const columnCount = usedRange.columnCount;

    const HEADER_ROW_INDEX = 1; // Row 2 in Excel

    // Get header row (Row 2)
    const headerRange = sheet.getRangeByIndexes(HEADER_ROW_INDEX, 0, 1, columnCount);

    // Get selected row
    const dataRange = sheet.getRangeByIndexes(rowIndex, 0, 1, columnCount);

    headerRange.load("values");
    dataRange.load("values");

    await context.sync();

    const headers = headerRange.values[0];
    const row = dataRange.values[0];

    let result: Record<string, any> = {};

    headers.forEach((header, index) => {
      if (header && row[index] !== null && row[index] !== "") {
        // handle date conversions
        if (header.toLowerCase() == "date") {
          const h = header.replace(/\s/g, "");
          result[h] = excelDateToJSDate(row[index]);
        }
        // handle time conversioins
        else if (header.toLowerCase() == "time in") {
          const h = header.replace(/\s/g, "");
          result[h] = excelTimeToString(row[index]);
        } else if (header.toLowerCase() == "container/truck no") {
          const h = header.replace("/Truck", "").replace(/\s/g, "");
          result[h] = row[index];
        } else if (header.toLowerCase() == "no of pal/bag(s)") {
          const h = header.replace(/\/Bag\(s\)/i, "").replace(/\s/g, "");
          result[h] = row[index].toString();
        } else {
          const h = header.replace(/\s/g, "");
          result[h] = row[index].toString();
        }
      }
    });

    if (Object.keys(result).length === 0) {
      throw new Error("Selected row is empty.");
    }

    console.log(result);
    return result as Partial<LabelData>;
  });

  return r;
}

export async function saveData() {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const range = sheet.getRange("A1");
    range.values = [["Data saved!"]];
    await context.sync();
  });
}
