import axios from "axios";
import api from "../api/api"

const AuthService = {

    register: (data) => {

    },

    login: async (data) => {
        try {
            console.log("inside service")
            const result = await api.post("/auth/login", data);
            console.log(result)
            return {
                isSuccess: true,
                data: result?.data || {},
                message: "Log-in successfull"
            }

        } catch (error) {
            throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
        }
    },

    logout: (data) => {

    },

    sendOtp: async (data) => {
        try{const { purpose, email, role } = data;
        console.log("inside send otp service")
        const result = await api.post("/auth/send-otp",
            data,
            { withCredentials: true }
        );
        // console.log(result)
        return {
                isSuccess: true,
                data: result?.data || {},
                message: "OTP sent to your email"
            }

    }catch(error){
        throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
    }

    },

    verifyOtp: () => { }

}

export default AuthService