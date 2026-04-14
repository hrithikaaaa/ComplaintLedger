const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/submit", require("./routes/submit"));
app.use("/status", require("./routes/status"));
app.use("/list", require("./routes/list"));

app.get("/", (req, res) => {
  res.json({ message: "Complaint backend is running!" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});