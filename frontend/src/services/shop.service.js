import api from "../api/api.js"

class ShopService{

     get=async(id,options={})=>{
        try {
            const result=await api.get(`/shop/get-shops/${id}`)
            // console.log("result=>",result)
            return {
                isSuccess:true,
                message:"Shop found",
                data:result?.data?.data
            }
        } catch (error) {
            throw {
                isSuccess:false,
                data:result?.data?.data,
                count:0,
                message: error?.response?.data?.message || "Uknown Error"
            }
        }
    }

    search=async(query)=>{
        try {
            const result=await api.get(`/shop/get-shops`)
            // console.log("service=>",result?.data?.data);
            return {
                isSuccess:true,
                data:result?.data?.data,  // count:result?.data?.data.length,
                message:"Shops found"
            }
        } catch (error) {
            throw {
                isSuccess:false,
                data:result?.data?.data,
                count:0,
                message: error?.response?.data?.message || "Uknown Error"
            }
        }

    }

    update=async()=>{

    }

    create=async()=>{

    }
}

export default new ShopService;