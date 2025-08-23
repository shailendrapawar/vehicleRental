import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminVehicleCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme)
    console.log(data)

    const navigate=useNavigate();

    const returnStatus = (status="Unknown") => {
        let colorStyle = "";

        switch (status) {
            case "pending": {
                colorStyle = "bg-yellow-400 text-gray-800"
                break
            }
            case "approved": {
                colorStyle = "bg-green-500 text-white"
                break
            }
            case "rejected": {
                colorStyle = "bg-red-500 text-white"
                break
            }
            case "banned": {
                colorStyle = "bg-gray-500 text-white"
                break
            }
            default:{
                colorStyle="bg-black text-white"
                break
            }
        }

        return (
            <div className={`h-6 w-auto px-2 ${colorStyle} text-xs flex justify-center items-center rounded-full`}   
            >
                {status}
            </div>
        )

    }

    return (
        <div className="h-20 w-full max-w-150 flex items-center justify-between px-2"
            style={{ borderBottom: `1px solid ${currentTheme.border}` }}
            onClick={()=>navigate(`/admin/single-vehicle/${data?._id}`)}
        >
            <img className="h-16 w-18 bg-amber-300 rounded-md"
            src={data.images[0].url}
            ></img>
            <span className="text-xs">{data?.brand?.toUpperCase()}- {data.model}</span>
            <span className="text-xs hidden sm:block">{data?.owner?.name||"User"}</span>
            {returnStatus(data?.status)}
            
        </div>
    )
}
export default React.memo(AdminVehicleCard)