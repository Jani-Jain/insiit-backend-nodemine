const cron = require("node-cron");
const FoundItemDay = require("../models/foundItemDay");
const { parseFoundSheet } = require("./foundSheetParser");

const SHEET_URL = process.env.FOUND_SHEET_URL;

function today() {
  return new Date().toISOString().split("T")[0];
}

// Runs once every day at 5 AM
cron.schedule("0 5 * * *", async () => {
  try {
    const items = await parseFoundSheet(SHEET_URL);

    await FoundItemDay.findOneAndUpdate(
      { date: today() },
      { date: today(), items },
      { upsert: true }
    );

    console.log("✅ Found items synced for", today());
  } catch (err) {
    console.error("❌ Found items cron failed:", err);
  }
});
