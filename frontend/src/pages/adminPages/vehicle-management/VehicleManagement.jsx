import { useEffect, useState } from "react"
import InputBox from "../../../components/inputBox/InputBox";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminVehicleCard from "../../../components/adminVehicleCard/AdminVehicleCard";

const VehicleManagement = () => {

  const {currentTheme}=useSelector(s=>s.theme)
  const [searchQuery,setSearchQuery]=useState("")

  const[searchResult,setSearchResult]=useState([])
  const [vehicles,setVehicles]=useState([]);


  const handleSearchVehicle=async()=>{
    try {

      const res=await axios.get(import.meta.env.VITE_API_URL+`/admin/vehicle/get-all-vehicles`,{withCredentials:true});
      // console.log(res)
      setVehicles(res.data.data.vehicles);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

    handleSearchVehicle()
  },[])

  return (
    <div className="h-[calc(100vh-80px)] w-full  flex flex-col relative">

      <aside className="w-full h-15 flex justify-center items-center gap-2">

        <input className="h-10 w-[70%] max-w-100 outline-none text-xs px-2 rounded-md"
          placeholder={"Search for vehicle..."}
          value={searchQuery}
          onChange={(e=>setSearchQuery(e.target.value))}
          style={{backgroundColor:currentTheme.cardBackground}}
          >
        </input>

        <button className="h-9 w-9 bg-amber-200 rounded-full p-2 active:scale-95 transition-all ease-in-out cursor-pointer"
        style={{backgroundColor:currentTheme.accent}}
        >
          <FaSearch className="h-full w-full"/>
        </button>
      </aside>


      <main className="w-full  py-10 flex flex-col items-center">

        {vehicles?.map((v,i)=>{
          return <AdminVehicleCard key={v._id} data={v}/>
        })}
      </main>
      
    </div>
  )
}
export default VehicleManagement