import { LabelData } from "../taskpane/interfaces";

export function excelDateToJSDate(serial: number) {
  const msPerDay = 86400000;
  const date = new Date((serial - 25569) * msPerDay);

  // 2. Format to dd/mm/yyyy
  return date.toLocaleDateString("en-GB");
}

export function excelTimeToString(value: number) {
  const totalSeconds = Math.round(value * 24 * 60 * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const pad = (n: number) => (n < 10 ? "0" + n : String(n));
  return `${pad(hours)}:${pad(minutes)}`;
}

export async function sendForPrint(labelData: Partial<LabelData>) {
  try {
    console.log("Token: ", JSON.stringify(labelData));
    const req = await fetch("https://localhost:7236/Print/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(labelData),
    });
    const res = await req.json();

    console.log("Print request sent successfully:", res);
    return res;
  } catch (error: Error | unknown) {
    console.error("Error sending print request:", error);
    throw error;
  }
}

export async function testApi() {
  try {
    const req = await fetch("https://localhost:7236/Print/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.text();
    console.log("API test successful:", res);
    return res;
  } catch (error) {
    console.error("Error testing API:", error);
    throw error;
  }
}

export async function getSettings(data: unknown) {
  Office.context.roamingSettings.set("settings", JSON.stringify(data));
  Office.context.roamingSettings.saveAsync();
  console.log(data);
}

export async function saveSettings() {
  const stored = Office.context.roamingSettings.get("settings");
  const parsed = stored ? JSON.parse(stored) : [];
  return parsed;
}

export const HandleBagNumber = (value: string) => {
  let bagNumbers: number[] | string[] = [];
  if (value.includes(",") || value.includes("-")) {
    bagNumbers = value.split(",").map((num) => num.trim());

    //   Convert to numbers and filter out invalid entries
    if (value.includes("-")) {
      // Handle range of bag numbers if needed
      const dashedNumbers = bagNumbers.filter((num) => num.includes("-")); // Remove the "-" from the list
      const cleanNumbers = bagNumbers
        .filter((num) => !num.includes("-"))
        .map((num) => Number(num.trim()));
      // Remove the "-" from the list

      if (cleanNumbers.some((num) => isNaN(num))) {
        throw new Error(`Invalid number: ${cleanNumbers.find((num) => isNaN(num))}`);
      }
      dashedNumbers.forEach((r) => {
        const ranges = r.split("-").map((num) => num.trim());
        if (ranges.some((range) => isNaN(Number(range)))) {
          throw new Error(`Invalid range: ${bagNumbers.find((range) => isNaN(Number(range)))}`);
        }

        const start = Number(ranges[0]);
        const end = Number(ranges[1]);

        const temp = [];
        for (let i = start; i <= end; i++) {
          temp.push(i);
        }
        cleanNumbers.push(...temp);
      });

      bagNumbers = cleanNumbers;
    } else {
      if (bagNumbers.some((range) => isNaN(Number(range)))) {
        throw new Error(`Invalid range: ${bagNumbers.find((range) => isNaN(Number(range)))}`);
      }

      bagNumbers = bagNumbers.map((num) => Number(num.trim()));
    }
  } else {
    if (bagNumbers.some((range) => isNaN(Number(range)))) {
      throw new Error(`Invalid number`);
    }
    bagNumbers = [Number(value.trim())];
  }

  return bagNumbers;
};
/**
 * 
 *{
  "Date": "07/04/2026",
  "TimeIn": "06:00",
  "ContainerNo": "GB2-437RH",
  "Product": "Long grain White Rice 15% BRK",
  "Supplier": "LT foods Netherlands",
  "PO": "940000568",
  "Origin": "India",
  "Batch": "CTEURY38783",
  "NoOfPal": "20",
  "TotalQty": "23MT",
  "Status": "Unloaded",
  "StorageLoc": "Shop Floor"
}
 * 
 */
