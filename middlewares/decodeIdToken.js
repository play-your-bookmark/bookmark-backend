const admin = require("firebase-admin");
const createError = require("http-errors");

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");

const serviceAccount = {
  "type": process.env.FIRBASE_TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": privateKey,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL,
};

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
