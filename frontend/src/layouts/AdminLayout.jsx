import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import roleRoutes from "../utils/roleRoutes"
import { useState } from "react"
const AdminLayout = ({ allowedRoles }) => {

  const { user } = useSelector(s => s.auth)
  // console.log(roleRoutes)

  const[adminRoutes,setAdminRoutes]=useState([
    {name:"Dashboard",path:"/admin/admin-dashboard"},
    {name:"Shops",path:"/admin/manage-shops"},
    {name:"Vehicles",path:"/admin/manage-vehicles"},
    {name:"Users",path:"/admin/manage-users"}
  ])

  

  if (!user) {
    return <Navigate to={"/login"} />
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={"/forbidden"} />
  }

  return (
    <div className="min-h-screen h-auto w-full relative flex flex-col">

      <Navbar routes={adminRoutes||[]} />

      <div className="w-full h-auto min-h-[calc(100vh-80px)] mt-20 ">
        <Outlet />
      </div>

    </div>
  )
}
export default AdminLayout