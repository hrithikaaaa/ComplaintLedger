const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

async function uploadToIPFS(fileBuffer, filename) {
  const form = new FormData();
  form.append("file", fileBuffer, filename);

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    form,
    {
      headers: {
        ...form.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET,
      },
    }
  );
  return response.data.IpfsHash;
}

module.exports = { uploadToIPFS };