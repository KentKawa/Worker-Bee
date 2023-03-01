import mongoose from "mongoose";

const hiveLIstSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    hiveList: { type: Array, required: true },
  },
  { strict: true }
);

export default mongoose.models.HiveLists ||
  mongoose.model("HiveLists", hiveLIstSchema);
