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

export async function sendForPrint(labelData: { key: string; value: unknown }[]) {
  await fetch("http://localhost:5000/print-label", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(labelData),
  });
}

/**
 * {
  "Date": "02/04/2026",
  "Time In": "06:00",
  "Container/Truck No": "AV23-CXB/BCH01",
  "Product": "Long Grain Basmati Rice",
  "Supplier": "Logo foods",
  "PO": 940000568,
  "Origin": "Netherlands",
  "Batch": "CT7638974398",
  "No of Pal/Bag(s)": 20,
  "Total Qty": "23MT",
  "Status": "Unloaded",
  "Storage Loc": "Shop Floor"
}
 * 
 */
