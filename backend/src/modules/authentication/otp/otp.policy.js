import mongoose from "mongoose";

export const OtpPolicy = {
    admin: {
        getOtp: {
            query: {},
            projections: "email purpose role isVerified attempts expiresIn"
        },
        searchOtps: {
            query: {},
            projections: "email purpose role isVerified attempts expiresIn createdAt",
            allowedFilters: ['email', 'purpose', 'role', 'isVerified', 'isExpired']
        }
    },
    owner: {
        sendOtp: {
            allowedPurposes: ['login', 'signup'],
            allowedRoles: ['owner', 'customer']
        },
        verifyOtp: {
            allowedPurposes: ['login', 'signup'],
            allowedRoles: ['owner', 'customer']
        }
    },
    customer: {
        sendOtp: {
            allowedPurposes: ['login', 'signup'],
            allowedRoles: ['customer']
        },
        verifyOtp: {
            allowedPurposes: ['login', 'signup'],
            allowedRoles: ['customer']
        }
    },
    public: {
        sendOtp: {
            allowedPurposes: ['signup', 'reset_password'],
            allowedRoles: ['customer', 'owner']
        },
        verifyOtp: {
            allowedPurposes: ['signup', 'reset_password'],
            allowedRoles: ['customer', 'owner']
        }
    }
}
