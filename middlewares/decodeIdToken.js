const admin = require("firebase-admin");
const createError = require("http-errors");

// const serviceAccount = {
//   type: process.env.FIRBASE_TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: process.env.CLIENT_EMAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: process.env.AUTH_URI,
//   token_uri: process.env.TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.CLIENT_CERT_URL,
// };

const serviceAccount = {
  "type": "service_account",
  "project_id": "crew-ca52d",
  "private_key_id": "8e4927711850ade0d550921e48b026f41163e46f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC43whyFcJvcqBE\n7cd8TZ8cWnfXVeEev/KOm9XDbrH7YiiBLPR2fdc+HoLuM6PUtLIsBb7upJ5xtKKI\nT143D3nFMD8Oltocm5dYEVVzqWksJJeABNV39nOr1XPjWCEYadWd98jCfz5opESC\n/1mYZeSbeyJ/Ks5lpuNHWAN2js3qjpgckXYbPL3Likoy4NPonqhYfsWRJonbBR6Z\ndFAZYl9xKPewnLxIHLZiageqiW/FVHwewDhthxpJ20pmqXpovsm8JjV9DX4jxZhy\nXK74WMuaDbtX0WQu1D49BeecyoqYa4LtI3F7//IRlgt5eYrfv63j1o3t3D3iUo4S\nVYlY5lUbAgMBAAECggEADtIilTLVYaXo313Irlhytw0xqlvCLnro8THhE0fekO6v\nnJuEBbPU+6/qgzo0miraVdkoE22zHh6DITZrsTJWas6RX5QMbFq06WSKWzlrqxRL\n6QF6M6HYaCA2qDU6ggCKFZ31xFH7KNxyeaYLAsK4bxaSD2vZHCEi+2c879ZG/9TH\ndXa/i+BuSerzMuA+dHRJg2/eLoSPB2qbk3KTxAHZKQYwY7TRwckjY2dn+kGyGVLl\nUcVyA6usGFA3lXmHjecrG5HCYJlaFUOQtrT3HAOKvkj2PtHwOiqLt+ayvbPX1yHy\nwfEmCX+fA8Q4rUJHsb/fJKaMMbNpw0SeHHxBkGJjwQKBgQD6siBpH9y4Lb36GlNj\nVpIvkMLMMJG1uyKDm5v/EoSU3BwS4HTZzKfSP5RlkGsxa4SMbdB+T8XRdx4QhbTK\ng9D99mq/piNWRrslU4Tr8jl9i5bmy8Wafd8JOZz7msP/clQFfrbHuvmXmRkxuo4m\nqaLuSwJb0wPpY/GYaTVkfCXPawKBgQC8yF9155gMIOekTQHsr+34vrOcrxbyI+X3\nwsh4dyWm+HsKVhcNVKDIoP4zzjiJoTG+i0iciN4LI2mFnK/WahtzWYVg3tI/UZuN\nnQ4+vLYFweIYrMe3j362y1smdUepgWmMP8Atq09qYoBWT8fGok1uAZosDQa9/5QN\nrUxJRvltEQKBgQDgtfnHQQAfNyEqpZ5JVLgEWsXBMWfqdasiPME/ieG9bO7dHMSg\n1Yk4NDVYNHNhAPb2yRgxoF+4ugUA2liLjkwu2EonL0xNcWketBZZR+2wUwcYKV8e\nc+UP58yG2tsEhf46TrKXpUlEUb77jDUPAs9AuYuLs0G2WhecffGV+JILsQKBgAvl\njK5/c8N/51khSTfDNnnwep0rI4UK4hkk+0EsMQE+s3JJTpaWeLNsAdj96+4wbFQX\nrvG+Zk/JYYL8BtC6SxSP1anvIMzAtc7M0PL/LXFbcIYhjUxyDIg0dIAN8AAsmZwv\nAEtgela38mJ+EJbh74M5MqAICh67FnduLlqH0HwhAoGBAPTFdoqY8+B0SqeZfAjo\npZLcaBb+J/rMwVeTGa4YmsEyWnOvcK9AvZ+McFjrI9PJtIk3Vzz8AzLH0VUT6arN\n/HWpOrMU3fHTUfNuVkFK6bqDIJUMFo1eVkArJJUb8v4/tEGFzN8qTTloDiRPMG7K\nambcIZ3U5CHgDAfEkodZaVud\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hrl32@crew-ca52d.iam.gserviceaccount.com",
  "client_id": "112998845877569072639",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hrl32%40crew-ca52d.iam.gserviceaccount.com"
}

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
