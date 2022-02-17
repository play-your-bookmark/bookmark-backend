const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", console.log.bind(console, "Connected to database.."));
};
