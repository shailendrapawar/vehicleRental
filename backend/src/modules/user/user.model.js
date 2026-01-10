import mongoose from "mongoose";
import { USER_ROLES, DEFAULT_USER_ROLE, USER_STATUSES, DEFAULT_USER_STATUS } from "../../constants/user.js"
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 6,
            select: false,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        profilePicture: {
            url: {
                type: String,
                default: "https://imgs.search.brave.com/tYAFNNn3NfY1DSm9CFk0mizKFz8iK1bicGd8JW5Q6KA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8y/NC81OC9kZWZhdWx0/LWF2YXRhci1wcm9m/aWxlLWljb24tdHJh/bnNwYXJlbnQtcG5n/LXZlY3Rvci01Nzgx/MjQ1OC5qcGc"
            },
            publicId: {
                type: String,
                default: ""
            }
        },
        role: {
            type: String,
            required: true,
            enum: USER_ROLES,
            default: DEFAULT_USER_ROLE,
        },
        dob: Date,
        status: {
            type: String,
            enum: USER_STATUSES,
            default: DEFAULT_USER_STATUS,

            // pending: before OTP verification,
            //approved: after OTP veirifcaiton (email)
            //banned: by admin,
            // inactive: by user itself for deactivation
        },
        statusMessage: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
