import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"

const OwnerLayout = ({  allowedRoles }) => {

  const { user } = useSelector(s => s.auth)

  const [ownerNavRoutes,setOwnerNavRoutes]=useState([
    {name:"Dashboard", path:"/owner/dashboard"},
    {name:"My Shops", path:"/owner/my-shops"},
    {name:"My Vehicles", path:"/owner/my-vehicles"},
    {name:"Bookings", path:"/owner/my-bookings"}
  ])
  

  if(!user){
    return  <Navigate to={"/login"}/>
  }
  if(!allowedRoles.includes(user.role)){
    return <Navigate to={"/forbidden"} />
  } 
   

  return (
    <div className="min-h-screen h-auto w-full relative flex flex-col">
      
      <Navbar routes={ownerNavRoutes} />

      <div className="w-full h-auto min-h-[calc(100vh-80px)] mt-20 ">
        <Outlet/>
      </div>

    </div>
  )
}
export default OwnerLayout