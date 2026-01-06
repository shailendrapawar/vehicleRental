import mongoose from "mongoose";

class BaseService {

    static getEntity = async (model, filter = {}, options = {}) => {
        return model.find(filter, options)
    }


    static searchEntityById = async(model, id) => {

        console.log(id)
    }



}

export default BaseService