console.log("Cab cleanup cron loaded");

const cron = require("node-cron");
const CabRide = require("../cabsharing");

cron.schedule("0 * * * *", async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const result = await CabRide.deleteMany({
    rideDateTime: { $lt: cutoff },
  });

  if (result.deletedCount > 0) {
    console.log("Deleted expired cab rides:", result.deletedCount);
  }
});
