import mongoose from "mongoose";

const { Schema } = mongoose;

const memberSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  email: String,
  pw: String,
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
