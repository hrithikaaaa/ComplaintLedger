const express = require("express");
const router = express.Router();
const contract = require("../services/contract");

const STATUS_MAP = {
  0: "open",
  1: "review",
  2: "resolved",
  3: "rejected",
};

router.get("/", async (req, res) => {
  try {
    const count = await contract.complaintCount();
    const complaints = [];
    for (let i = 1; i <= Number(count); i++) {
      const c = await contract.getComplaint(i);
      complaints.push({
        id: `CMP-${String(i).padStart(3, "0")}`,
        title: c.title,
        description: c.description,
        category: c.category,
        status: STATUS_MAP[Number(c.status)] ?? "open",
        submittedBy: c.submittedBy,
        timestamp: Number(c.timestamp),
        date: new Date(Number(c.timestamp) * 1000).toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        }),
      });
    }
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
