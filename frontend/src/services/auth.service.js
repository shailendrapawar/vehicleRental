import axios from "axios";
import api from "../api/api"

const AuthService = {

    // TODO
    checkUserExists:async(data)=>{
        try {
            const{email}=data
            const result=await axios.get("/auth")
            
        } catch (error) {
            
        }
    },

    register: async(data) => {
        try {
            const result=await api.post("/auth/register",data)
            console.log(result);
            return {
                isSuccess: true,
                data: result?.data || {},
                message: "Registration successfull"
            }
            
        } catch (error) {
            throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
        }

    },

    login: async (data) => {
        try {
            // console.log("inside service")
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
        try {
            const { purpose, email, role } = data;
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

        } catch (error) {
            throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
        }

    },

    verifyOtp: async (data) => {
        try {
            const { email, purpose, role, otp } = data;
            const result = await api.post("/auth/verify-otp",
                data,
                { withCredentials: true }
            )
            // console.log(result)
            return {
                isSuccess: true,
                message: result?.data?.message || "Otp verified",
                data: result?.data || {}
            }
        } catch (error) {
            throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
        }
    }

}

export default AuthService