import mongoose from "mongoose";

export const toObjectId = (str) => {
    if (!str || str?.trim() == "" || typeof (str) !== 'string') return null;

    return mongoose.Types.ObjectId.createFromHexString(str);
}