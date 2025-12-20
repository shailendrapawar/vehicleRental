import { useSelector } from "react-redux";
import Header from "../../../components/header/Header"
import { FaCar } from "react-icons/fa";
import { useState } from "react";
import VehicleCard from "../../../components/vehicleCard/VehicleCard";
const SingleShop = () => {
  const { currentTheme } = useSelector(s => s.theme)

  const[vehicles,setVehicles]=useState([1,2,3,4,5])
  return (
    <div
      className=" h-full w-full rounded-md relative"
    >
      <Header title="Shop Management" action={() => { }} actionIcon={<FaCar />} actionTitle="Add Vehicle" />

      <section className="h-[30%] w-full  mt-5 rounded-md flex gap-5 relative">
        <div className="h-full w-[60%] rounded-md"
          style={{
            backgroundColor: currentTheme.cardBackground,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >

        </div>

        <div className="h-full w-[40%] rounded-md"
          style={{
            backgroundColor: currentTheme.cardBackground,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >

        </div>
      </section>



      <section className="relative flex flex-col">

        <span className="mt-4 px-4 flex items-center justify-between">
          <h3 className="font-semibold text-xl w-[60%]">Title of shop</h3>
          <span className="h-8 w-25 flex items-center justify-center rounded-full text-white"
          style={{backgroundColor:currentTheme.secondary}}
          >Location</span>
        </span>

        <span className="w-full h-auto px-4 mt-2"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          description of shop
        </span>

        <span className="w-full px-4 py-4">
          tags
        </span>
      </section>

      {/* <hr className="font-bold"></hr> */}

      <div className="h-10 w-full  mt-4 flex justify-center gap-5">
        <input className="h-10 w-[50%] max-w-100 bg-white rounded-md outline-none px-2" 
        placeholder="Search in garage..."
        style={{
          backgroundColor:currentTheme.cardBackground,
          boxShadow:`2px 2px 5px ${currentTheme.border}`
        }}
        />
        <button className="h-10 w-10 rounded-full bg-blue-500">f</button>
      </div>

      <main className="h-100 mt-4 w-full  flex gap-4 flex-wrap overflow-y-scroll hide-scrollbar justify-center items-center">
        {/* all vehicles */}
        {vehicles.map(()=>{
          return <VehicleCard/>
        })}
      </main>
    </div>
  )
}
export default SingleShop