import mongoose from "mongoose";

export const Hive = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  hiveName: { type: String },
  weight: { type: Number },
  queenPlaced: { type: String },
  temperament: { type: Number },
  medicine: { type: [String], default: [] },
  disease: { type: [String], default: [] },
  location: { type: [Number], default: [0, 0] },
});

export const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: String,
    username: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    hives: {
      type: Map,
      of: [Hive],
      default: {},
    },
    schedule: [],
  },
  { strict: true }
);

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
