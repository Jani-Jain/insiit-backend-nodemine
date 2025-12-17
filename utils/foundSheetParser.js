const ExcelJS = require("exceljs");
const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

async function parseFoundSheet(sheetUrl) {
  const today = new Date().toISOString().split("T")[0]; 
  const filePath = path.join(os.tmpdir(), `found_${Date.now()}.xlsx`);

  const response = await axios({
    url: sheetUrl,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const ws = workbook.worksheets[0];
  const items = [];

  ws.eachRow((row, index) => {
    if (index === 1) return; 

    const place = row.getCell(1).text?.trim();
    const item = row.getCell(2).text?.trim();
    const remarks = row.getCell(3).text?.trim() || "-";

    if (place && item) {
      items.push({ place, item, remarks });
    }
  });

  return {
  date: today,
  items,
};

}

module.exports = { parseFoundSheet };