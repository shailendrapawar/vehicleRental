import api from "../api/api.js"

class VehicleService {

    // get:async()=>{

    // },

    buildQuery(data) {
        let params = new URLSearchParams();
        //for search
        if (data.status) {
            params.append("status", data.status);
        }
        if (data.vehicleType) {
            params.append("vehicleType", data.vehicleType);
        }
        if (data.page) {
            params.append("page", data.page);
        }
        if (data.limit) {
            params.append("limit", data.limit);
        }
        if(data.shop){
            params.append("shop",data.shop)
        }

        return params
    }

    async search(data, options) {
        try {
            const query = this.buildQuery({ ...data, ...options })
            const result = await api.get(`/vehicle/get-vehicles?${query}`)

            return {
                isSuccess: true,
                message: "Vehicles found",
                data: result?.data?.data
            }

        } catch (error) {
            throw {
                isSuccess: false,
                data: {},
                message: error?.response?.data?.message || "Uknown Error"
            }
        }

    }

    async get(data, options) {

    }

    async create() {

    }

}
// export default VehicleService
export default new VehicleService();