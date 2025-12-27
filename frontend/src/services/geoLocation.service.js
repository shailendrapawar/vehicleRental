import axios from "axios"


class GeoLocation {

    constructor() {
        this.apiKey = "07e9e93cb4dd42759d65a120d56c2fd1"
        this.baseUrl = "https://api.geoapify.com/v1/geocode"
        this.countryCodFilter="filter=countrycode:in"
    }

    reponseMapper = (response) => {
        const feature = response?.properties
        // console.log(feature)

        return {
            addressLine1: feature?.address_line1,
            addressLine2: feature?.address_line1,
            formattedAddress: feature?.formatted,

            // name: feature?.name,

            // street: feature?.street,
            // locality: feature?.suburb,


            pinCode: feature?.postcode,
            city: feature?.city,
            district: feature?.district,

            state: feature?.state,
            // stateCode: feature?.state_code,

            country: feature?.country,
            // countryCode: feature?.country_code,

            lat: feature?.lat,
            lon: feature?.lon,
        }
    }


    buildQuery = (model) => {
        let query = new URLSearchParams({
            ...model,
            apiKey: this.apiKey
        });

        return query.toString();
    }

    reverseLocate = async (data) => {
        try {
            const query = this.buildQuery(data);
            const result = await axios.get(`${this.baseUrl}/reverse?${query}`);
            return {
                isSuccess: true,
                data: this.reponseMapper(result.data?.features[0]),
                message: "Location found"
            }
        } catch (error) {
            return {
                isSuccess: false,
                data:null,
                message: "Something went wrong..."
            }
        }
    }

    forwardLocate=async(data)=>{
        try {
            const query = this.buildQuery(data);
            const result=await axios.get(`${this.baseUrl}/search?text=${data.query}&limit=3`)
            
        } catch (error) {
            return {
                isSuccess: false,
                data:null,
                message: "Something went wrong..."
            }
        }
    }

    autoComplete=async(data)=>{
        try {
            const result=await axios.get(`${this.baseUrl}/autocomplete?text=${data.query}&limit=3&${this.countryCodFilter}&apiKey=${this.apiKey}`)
            let items=[];
            result?.data.features?.forEach((v,i)=>{
                // console.log("v",v)
                let res=this.reponseMapper(v)
                items.push(res)
            }) 
            console.log(items)

            return {
                isSuccess:true,
                data:items||[],
                message:""
            }
        } catch (error) {
             return {
                isSuccess: false,
                data:null,
                message: "Something went wrong..."
            }
        }
    }
}

export default new GeoLocation