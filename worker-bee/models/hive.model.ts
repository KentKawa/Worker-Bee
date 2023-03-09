import mongoose from "mongoose";

export const Hive = new mongoose.Schema({
  hive_id: { type: mongoose.Types.ObjectId, auto: true },
  hiveName: { type: String, required: true },
  weight: { type: Number, required: true },
  queenPlaced: { type: String, required: true },
  temperament: { type: Number, required: true },
  medicine: { type: [String], default: [] },
  disease: { type: [String], default: [] },
  location: { type: [Number], default: [0, 0] },
});

export default mongoose.models.Users || mongoose.model("Hive", Hive);
