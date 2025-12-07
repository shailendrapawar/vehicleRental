import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "owner", "customer"],
      required: true,
    },
    action: {
      type: String,
      required: true,
      // Example: "login", "logout", "create_vehicle", "delete_shop", "update_profile"
    },
    entity: {
      type: String,
      enum: ["user", "vehicle", "shop", "review", "system"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // Sometimes activity is system-wide (like login/logout)
    },
    description: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String, // browser/device info
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
