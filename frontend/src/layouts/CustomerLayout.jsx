import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const CustomerLayout = ({allowedRoles}) => {
  console.log(allowedRoles)
  const {user}=useSelector(s=>s.auth)
  console.log(user)

  if(!user){
    return  <Navigate to={"/login"}/>
  }

  if(!allowedRoles.includes(user.role)){
    return <Navigate to={"/forbidden"} />
  } 
  
  return (
    <div>CustomerLayout</div>
  )
}
export default CustomerLayout