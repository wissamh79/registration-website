import mongoose from "mongoose";

const { Schema } = mongoose;

const attendSchema = new Schema(
  {
    fullName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 11,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.Attend || mongoose.model("Attend", attendSchema);
