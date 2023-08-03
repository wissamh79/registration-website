import mongoose from "mongoose";

const { Schema } = mongoose;

const acceptedSchema = new Schema(
  {
    fullName: {
      type: String,

      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
      maxlength: 15,
      minlength: 11,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Accepted ||
  mongoose.model("Accepted", acceptedSchema);
