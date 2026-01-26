import mongoose from "mongoose";

export const UserPolicy = {
    admin: {
        getUsers: {
            query: {},
            projections: "name email role status profilePicture"
        },
        getSingleUser: {
            query: {},
            projections: "name email role status statusMessage profilePicture dob",
            populate: []
        },
        updateUser: {
            query: {},
            projections: "name email role status statusMessage profilePicture dob",
            allowedFields: ['name', 'email', 'role', 'status', 'statusMessage']
        }
    },
    owner: {
        getUsers: {
            query: (user) => ({ role: "owner" }),
            projections: "name email role status profilePicture"
        },
        getSingleUser: {
            query: (user) => ({ _id: new mongoose.Types.ObjectId(user._id) }),
            projections: (user, targetUser) => {
                if (targetUser && user._id.toString() === targetUser._id.toString()) {
                    return "name email role status statusMessage profilePicture dob"
                }
                return "name email profilePicture"
            },
            populate: []
        },
        updateUser: {
            query: (user, data) => ({ _id: new mongoose.Types.ObjectId(user._id) }),
            allowedFields: (user, targetUser) => {
                if (targetUser && targetUser._id.toString() === user._id.toString()) {
                    return ['name', 'email', 'dob', 'profilePicture']
                }
                return []
            }
        }
    },
    customer: {
        getUsers: {
            query: (user) => ({ role: "customer" }),
            projections: "name email role profilePicture"
        },
        getSingleUser: {
            query: (user) => ({ _id: new mongoose.Types.ObjectId(user._id) }),
            projections: (user, targetUser) => {
                if (targetUser && user._id.toString() === targetUser._id.toString()) {
                    return "name email role status profilePicture dob"
                }
                return "name email profilePicture"
            },
            populate: []
        },
        updateUser: {
            query: (user, data) => ({ _id: new mongoose.Types.ObjectId(user._id) }),
            allowedFields: (user, targetUser) => {
                if (targetUser && targetUser._id.toString() === user._id.toString()) {
                    return ['name', 'email', 'dob', 'profilePicture']
                }
                return []
            }
        }
    }
}
