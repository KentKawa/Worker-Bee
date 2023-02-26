import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: String,
    username: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { strict: true }
);

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
