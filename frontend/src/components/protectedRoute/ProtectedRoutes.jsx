import { useSelector } from "react-redux"
import { Navigate } from "react-router";


const ProtectedRoutes = ({ children, allowedRoles = [] }) => {

  const { user } = useSelector(s => s.authUser);

  if (!user) {
    return <Navigate to={"/auth/login"} replace />
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/forbidden"} replace />
  }

  return (
    <>
      {children}
    </>
  )
}
export default ProtectedRoutes 