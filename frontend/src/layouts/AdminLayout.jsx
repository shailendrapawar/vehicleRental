import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const AdminLayout = ({allowedRoles}) => {

    const { user } = useSelector(s => s.auth)
  
  if(!user){
    return  <Navigate to={"/login"}/>
  }
  if(!allowedRoles.includes(user.role)){
    return <Navigate to={"/forbidden"} />
  } 
  return (
    <div>AdminLayout</div>
  )
}
export default AdminLayout