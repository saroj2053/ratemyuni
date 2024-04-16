import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    profileAvatar: {
      type: String,
      default: "",
    },
    userType: {
      type: String,
      required: true,
      enum: ["Student", "Teacher", "Administrator"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
