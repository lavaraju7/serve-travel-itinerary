const mongoose = require("mongoose");
const uri =
  "mongodb+srv://appeople:JPu2DEj3qGnw2i6h@clustera.0flds.mongodb.net/";
const start = async () => {
  try {
    mongoose.set('debug',true)
    await mongoose.connect(uri, {
      dbName: "appeople",
    });
    console.log("Connection Successfull");
  } catch (err) {
    console.log(err);
  }
};
module.exports = { start };
