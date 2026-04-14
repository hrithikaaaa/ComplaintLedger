const express = require("express");
const router = express.Router();
const contract = require("../services/contract");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, category } = req.body;

     console.log("REQ BODY:", req.body);
    console.log("VALUES:", { title, description, category });

    const tx = await contract.submitComplaint(title, description, category);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;