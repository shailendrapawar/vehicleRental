import mongoose from "mongoose";

const entitySchema = new mongoose.Schema({
    reference: {
        model: {
            type: String,
            enum: ["User", "Shop", "Vehicle", "Booking", "Review", "System"],
            required: false,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        }
    }

})

const notificationSchema = new mongoose.Schema(
    {
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // who will receive the notification
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // who triggered it (could also be system)
            default: null,
        },
        type: {
            type: String,
            enum: [
                "system_action", // system-wide (maintenance, update)
                "user_action",   // user specific actions
                "shop_action",   // shop related
                "vehicle_action",// vehicle related
                "booking_action",// booking-related alerts
                "admin_action",  // admin messages
            ],
            default: "system_action",
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
        
        entity:entitySchema,

        isRead: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        expiresAt: {
            type: Date, // auto-delete after certain time if needed
        },
    },
    { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
