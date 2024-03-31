const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region:process.env.S3_REGION,
});

exports.ImageUploadApi = async (req, res) => {
  try {
    let keys = req.query;
    if (!Array.isArray(keys)) {
      keys = [keys];
    }
    
    const urls = [];

    for (const key of keys) {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key.name,
        Expires: 60 * 60 * 5,
        ContentType: key.type,
      };

      const url = s3.getSignedUrl("putObject", params);
      urls.push(url);
    }

    res.json({ urls });
    console.log(urls);
  } catch (error) {
    console.error("error in uploading file ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


