import mongoose from "mongoose"

import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        name: {
            type: String,
            required: true
            // Human readable: "Admin", "Vehicle Owner"
        },

        description: {
            type: String
        },

        isSystem: {
            type: Boolean,
            default: false
            // system roles cannot be deleted (admin, superadmin)
        },

        isActive: {
            type: Boolean,
            default: true
        },
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }],

        metadata: {
            type: Object,
            default: {}
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        }
    },
    {
        timestamps: true
    }
);

// Indexes
RoleSchema.index({ key: 1, tenantId: 1 }, { unique: true });

export const Role = mongoose.model("Role", RoleSchema);
