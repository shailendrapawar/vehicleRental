import mongoose, { mongo } from "mongoose";

export const toObjectId = (str) => {
    if (!str || str?.trim() == "" || typeof (str) !== 'string') return null;

    return mongoose.Types.ObjectId.createFromHexString(str);
}

export const isObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
} 