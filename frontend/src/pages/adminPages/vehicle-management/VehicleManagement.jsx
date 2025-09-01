import { useEffect, useState } from "react"
import InputBox from "../../../components/inputBox/InputBox";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminVehicleCard from "../../../components/adminVehicleCard/AdminVehicleCard";


import KpiCard from "../../../components/kpiCard/KpiCard";
import { FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";

import { TbMotorbike } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { PiScooterBold } from "react-icons/pi";
import { TbSum } from "react-icons/tb";

const VehicleManagement = () => {

  const {currentTheme}=useSelector(s=>s.theme)
  const [searchQuery,setSearchQuery]=useState("")

   const [kpiData, setKpiData] = useState({})



  const[searchResult,setSearchResult]=useState([])
  const [vehicles,setVehicles]=useState([]);




  const handleSearchVehicle=async()=>{
    try {

      const res=await axios.get(import.meta.env.VITE_API_URL+`/admin/vehicle/get-all-vehicles`,{withCredentials:true});
      console.log(res)
      setVehicles(res.data.data.vehicles);
    } catch (error) {
      console.log(error)
    }
  }

    const returnStatus = (status = "unknown", position) => {
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
      default: {
        colorStyle = "bg-black text-white"
        break
      }
    }

    return (
      <div className={`h-6 max-w-15 px-1 ${position} ${colorStyle} text-xs flex justify-center items-center rounded-full`}
      >
        {status}
      </div>
    )

  }

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "searchQuery") {
      setSearchQuery(value);
    }

  }

  useEffect(()=>{
    handleSearchVehicle()
  },[])



  return (
    <div className="min-h-[calc(100vh-80px)] h-auto pb-5 w-full  flex flex-col relative">

      
      <h3 className="w-full text-center my-5 text-xl ">Vehicle Management</h3>

      <section className=" w-full gap-5 grid grid-cols-4 ">

        <KpiCard size={" h-35 col-span-4 sm:col-span-1"}
          data={{
            heading: "Total Vehicles",
            number: kpiData?.totalUsers || 0
          }}
          icon={<TbSum className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-4 sm:col-span-1"}
          data={{
            heading: "Total Scooty",
            number: kpiData?.totalUsers || 0
          }}
          icon={<PiScooterBold className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-4 sm:col-span-1"}
          data={{
            heading: "Total Bikes",
            number: kpiData.owners || 0
          }}
          icon={<TbMotorbike className="h-8 w-8 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-4 sm:col-span-1"}
          data={{
            heading: "Total Cars",
            number: kpiData?.customers || 0
          }}
          icon={<FaCar className="h-8 w-8 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

      </section>

      <section className="px-5 overflow-x-scroll py-5 mt-5 rounded-lg " style={{ backgroundColor: currentTheme.cardBackground }}>

        <div className=" w-full mb-5  flex gap-2 justify-center items-center rounded-lg">
          <InputBox size={"h-10 w-[65%]"}
            placeholder={"Search for user..."}
            value={searchQuery}
            name={"searchQuery"}
            onChange={handleChange}
          />

          <span className="h-10 w-[10%] hidden sm:block rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
          <span className="h-10 w-[10%] hidden sm:block  rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
          <span className="h-10 w-[10%] hidden sm:block  rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
        </div>



        <table className="h-auto w-full  rounded-md ">

          <thead className="h-10 w-full text-sm px-5">
            <tr className="text-left " style={{ borderBottom: `2px solid ${currentTheme.border}` }}>
              <th className="w-[20%]">REG no.</th>
              <th className="w-[20%]">Brand-model</th>
              <th className="w-[20%]">Status</th>
              <th className="w-[20%]">Type</th>
              <th className="w-[20%]">Shop</th>
            </tr>
          </thead>



          <tbody className=" w-full px-2">

            {vehicles?.map((v, i) => {
              return <tr key={i} className=" h-15 text-xs"
                style={{ borderBottom: `1px solid ${currentTheme.border}` }}
                onClick={()=>navigate(`/admin/manage-users/${v._id}`)}
              >
                <td className="w-[20%]">
                    <span>{v?.registrationNumber?.toUpperCase()}</span>
                </td>
                <td className="w-[20%]" style={{ }}>{v?.brand?.toUpperCase()} - {v?.model}</td>
                <td className="w-[20%]">{returnStatus(v?.status)}</td>
                <td className="w-[20%]">{v?.vehicleType?.toUpperCase()}</td>
                <td className="w-[20%]">{v?.shopId?.name}<br></br>
                <span className="text-[8px]" style={{color:currentTheme.textSecondary}}>{v?.shopId?._id}</span>
                </td>
              </tr>
            })}
          </tbody>
        </table>

        <div className="h-8 mt-5 bg-yellow-50 w-full">
         
        </div>

      </section>
    </div>
  )
}
export default VehicleManagement