import { useState } from "react"

import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";



const ShopManagement = () => {

  const [searchQuery, setSearchQuery] = useState();
  const { currentTheme } = useSelector(s => s.theme)

  const fetchAllShops=async()=>{
    
  }

  return (

    <div className="h-[calc(100vh-80px)] bg-red-500 w-fulll flex flex-col relative">

      <aside className="w-full h-15 flex justify-center items-center gap-2">

        <input className="h-10 w-[70%] max-w-100 outline-none text-xs px-2 rounded-md"
          placeholder={"Search for Shops..."}
          value={searchQuery}
          onChange={(e => setSearchQuery(e.target.value))}
          style={{ backgroundColor: currentTheme.cardBackground }}
        >
        </input>

        <button className="h-9 w-9 bg-amber-200 rounded-full p-2 active:scale-95 transition-all ease-in-out cursor-pointer"
          style={{ backgroundColor: currentTheme.accent }}
        >
          <FaSearch className="h-full w-full" />
        </button>
      </aside>

      <main className="w-full  py-10 flex flex-col items-center">

        {/* {[]?.map((v, i) => {
          return <AdminVehicleCard key={v._id} data={v} />
        })} */}
      </main>

    </div>

  )
}
export default ShopManagement