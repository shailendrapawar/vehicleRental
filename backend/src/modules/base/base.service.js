import mongoose from "mongoose";

class BaseService {

     static handleResponse(res, status = 200, message = "Success", data = null) {
        return res.status(status).json({
            success: true,
            message,
            data,
        });
    }

     static handleError(res, status = 500, error) {
        return res.status(status).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }


}

export default BaseService