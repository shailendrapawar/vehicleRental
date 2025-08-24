import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShopCard from "../../../components/shopCard/ShopCard";
import AdminShopCard from "../../../components/adminShopCard/AdminShopCard";



const ShopManagement = () => {

  const [searchQuery, setSearchQuery] = useState();
  const { currentTheme } = useSelector(s => s.theme)

  const[shops,setShops]=useState([]);


  const fetchAllShops=async()=>{
    try {
      const res=await axios.get(import.meta.env.VITE_API_URL+`/admin/shop/get-all-shops`,{
        withCredentials:true
      })
      console.log(res.data.data.shops)
      setShops(res.data.data.shops)
    } catch (error) {
      
      console.log(error)
      toast.error("Something went wrong")
    }    
  }

  useEffect(()=>{
    fetchAllShops();
  },[])

  return (

    <div className="h-[calc(100vh-80px)] w-fulll flex flex-col relative">

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


      <main className="w-full  py-10 flex flex-col items-center gap-2">

        {shops?.map((v,i)=>{
          return <AdminShopCard key={i} data={v}/>
        })}
  
      </main>

    </div>

  )
}
export default ShopManagement