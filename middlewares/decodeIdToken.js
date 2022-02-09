const admin = require("firebase-admin");
const createError = require("http-errors");

const serviceAccount = require("../firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
