import mongoose from "mongoose";

const hiveLIstSchema = new mongoose.Schema({});

export default mongoose.models.HiveLists ||
  mongoose.model("HiveLists", hiveLIstSchema);
