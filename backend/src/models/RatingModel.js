import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetModel: {
      type: String,
      enum: ["Shop", "Vehicle"], // type of review target
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetModel", // dynamic reference → could be Shop or Vehicle
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate review by same user for same target
// reviewSchema.index({ user: 1, targetModel: 1, targetId: 1 }, { unique: true });

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
