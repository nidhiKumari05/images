const express = require("express");
const router = express.Router();
const ImageUploadContoller = require("../contollers/ImageUploadContoller")

//Routes API


router.get("/fetchSignedUrl" ,ImageUploadContoller.ImageUploadApi);

module.exports = router;

// const AWS = require('aws-sdk');

// exports.ImageUploadApi = async (req, res) => {
//   try {
//     // Validate input
//     const keys = req.query.keys;
//     if (!Array.isArray(keys)) {
//       return res.status(400).json({ error: "Invalid keys parameter" });
//     }

//     // Initialize AWS SDK
//     const s3 = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });

//     // Generate signed URLs in parallel
//     const promises = keys.map(async (key) => {
//       const params = {
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: key.name,
//         Expires: 60 * 60,
//         ContentType: key.type,
//       };
//       return s3.getSignedUrlPromise("putObject", params);
//     });

//     const urls = await Promise.all(promises);

//     // Send the URLs as response
//     res.json({ urls });
//     console.log("Signed URLs:", urls);
//   } catch (error) {
//     console.error("Error in uploading files:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };