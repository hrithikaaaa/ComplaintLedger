const express = require("express");
const router = express.Router();
const contract = require("../services/contract");

router.get("/:id", async (req, res) => {
  try {
    const c = await contract.getComplaint(req.params.id);
    res.json({
      id: Number(c.id),
      title: c.title,
      description: c.description,
      category: c.category,
      status: Number(c.status),
      submittedBy: c.submittedBy,
      timestamp: Number(c.timestamp),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;