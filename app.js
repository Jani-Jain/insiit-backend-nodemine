require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

require("./utils/cabcleanup");
require("./utils/foundDailyCron");

const app = express();   
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MongoDBAtlas;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({ status: "alive" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
