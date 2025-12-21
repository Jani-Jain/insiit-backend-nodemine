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


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send('Go to /api-docs for API Documentation');
});

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
