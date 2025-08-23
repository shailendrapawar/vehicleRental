import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import roleRoutes from "../utils/roleRoutes"

const OwnerLayout = ({  allowedRoles }) => {

  const { user } = useSelector(s => s.auth)
  

  if(!user){
    return  <Navigate to={"/login"}/>
  }
  if(!allowedRoles.includes(user.role)){
    return <Navigate to={"/forbidden"} />
  } 
   

  return (
    <div className="min-h-screen h-auto w-full relative flex flex-col">
      
      <Navbar routes={roleRoutes.owner|| []} />

      <div className="w-full h-auto min-h-[calc(100vh-80px)] mt-20 ">
        <Outlet/>
      </div>

    </div>
  )
}
export default OwnerLayout