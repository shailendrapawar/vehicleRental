import { useSelector } from "react-redux"
import Header from "../../../components/header/Header"
import { useState } from "react"
import VehicleCard from "../../../components/vehicleCard/VehicleCard"


const Vehicles = () => {
  const { currentTheme } = useSelector(s => s.theme)
  const [vehicles, allVehicles] = useState([1, 2, 3, 4, 5])

  console.log(vehicles)
  return (
    <div
      className=" h-full w-full rounded-md "
    >
      <Header title="Vehicles management" />

      <section className="h-10 w-full mt-5 rounded-md flex  justify-center items-center gap-5">

        <input className="h-full w-[50%] max-w-100 rounded-md text-sm px-2 outline-none"
          placeholder="Search for your vehicle..."
          style={{
            color: currentTheme.textSecondary,
            border: `2px solid ${currentTheme.border}`,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        ></input>

        <select className="h-full w-20 text-sm text-center rounded-md outline-none cursor-pointer"
          style={{
            color: currentTheme.secondary,
            border: `2px solid ${currentTheme.secondary}`,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >
          <option className="" disabled hidden>Type</option>
          <option>Scooty</option>
          <option>Bike</option>
          <option>Car</option>
        </select>

        <select className="h-full w-20 text-sm text-center rounded-md outline-none cursor-pointer"
          style={{
            color: currentTheme.secondary,
            border: `2px solid ${currentTheme.secondary}`,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >
          <option className="" disabled hidden>Status</option>
          <option>Available</option>
          <option>Booked</option>
        </select>
      </section>

      <section className="h-10 w-full bg-red-500 mt-5 right-0">
        page No and detials details
      </section>


      <section className="w-full h-auto max-h-[calc(100vh-200px)] bg-amber-600 py-5  mt-5 flex justify-center flex-wrap gap-5 overflow-y-scroll hide-scrollbar relative">
        {vehicles?.map((v, i) => {
          return <VehicleCard key={i} />
        })}
      </section>

    </div>
  )
}
export default Vehicles