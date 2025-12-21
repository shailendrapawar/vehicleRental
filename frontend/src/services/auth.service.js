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
                isSuccess:true,
                data:result?.data||{},
                message:"Log-in successfull"
            }

        } catch (error) {
            console.log(error)
            throw {
                isSuccess:false,
                data:{},
                message:error?.response?.data?.message||"Uknown Error"
            }
        }
    },

    logout: (data) => {

    },

    sendOtp: () => { },

    verifyOtp: () => { }

}

export default AuthService