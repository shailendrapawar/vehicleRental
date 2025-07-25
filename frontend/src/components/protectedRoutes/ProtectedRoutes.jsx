import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children,allowedRoles=[],user}) => {

    if(!user) return <Navigate to={"/login"}/>
    if(!allowedRoles.includes(user.role)) return <Navigate to={"/register"}/>
  return (
    {children}
  )
}
export default ProtectedRoutes