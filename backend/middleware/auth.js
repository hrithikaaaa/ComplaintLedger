const { ethers } = require("ethers");

function verifyWallet(req, res, next) {
  const { address, signature, message } = req.headers;
  if (!address || !signature || !message) {
    return res.status(401).json({ error: "Missing wallet auth headers" });
  }
  try {
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(403).json({ error: "Signature mismatch" });
    }
    req.walletAddress = address;
    next();
  } catch {
    res.status(403).json({ error: "Invalid signature" });
  }
}

module.exports = verifyWallet;