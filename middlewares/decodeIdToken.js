const admin = require("firebase-admin");
const createError = require("http-errors");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECURE_ACCESS_KEY,
});
const params = { Bucket: "90crew-playyourbookmark2", Key: "firebaseKey.json" };

s3.getObject(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    const body = JSON.parse(Buffer.from(data.Body).toString());

    admin.initializeApp({
      credential: admin.credential.cert(body),
    });
  }
});

async function decodeIDToken(req, res, next) {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.currentUser = decodedToken;
    next();
  } catch (err) {
    next(createError(401));
  }
}

module.exports = decodeIDToken;
