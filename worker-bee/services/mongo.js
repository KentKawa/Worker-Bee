const mongoose = require("mongoose");
require("dotenv").config();
const { DB_CONN_STRING } = process.env;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { useNewUrlParser: true };

    cached.promise = mongoose.connect(DB_CONN_STRING, opts).then((mongoose) => {
      console.log("connect");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
