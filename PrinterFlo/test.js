const data = "1,2,3-9,11,15-20";
const data2 = "1,2,3,r";
const data3 = "1";

const handleBagNumberBlur = (value) => {
  let bagNumbers = [];
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
      throw new Error(`Invalid range: ${ranges}`);
    }
    bagNumbers = [Number(value.trim())];
  }
  console.log(bagNumbers);
  return bagNumbers;
};

handleBagNumberBlur(data);
handleBagNumberBlur(data2);
handleBagNumberBlur(data3);
