import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "National University",
        "Provincial University",
        "Autonomous Institute",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);

export default University;
