import api from "../api/api.js"

const VehicleService={

    get:async()=>{

    },

    search:async(query)=>{
        try {
            const result=await api.get(`/shop/search-shops`)
            console.log("service=>",result);
            return {
                isSuccess:true,
                // data:result?.data
            }
        } catch (error) {
            
        }

    },

    update:async()=>{

    },

    create:async()=>{

    }
}

export default VehicleService;