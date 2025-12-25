import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import OwnerNavbar from "../components/ownerNavbar/OwnerNavbar";

import Header from "../components/header/Header";
import { useEffect } from "react";

const OwnerLayout = ({ childern,allowedRoles }) => {

  const { currentTheme } = useSelector(s => s.theme);
  const {user}=useSelector(s=>s.authUser)
  const navigate=useNavigate();

  // console.log("user in owner layout:", allowedRoles);

useEffect(()=>{
  // if(!allowedRoles?.includes(user.role)){
  //   navigate("/forbidden");
  //   return
  // }
},[])

  return (
    <main className=" w-screen h-screen flex p-5 gap-5"
    //  style={{ backgroundColor: currentTheme.background }}
    >
      <OwnerNavbar />
      <section className="w-full h-full hide-scrollbar rounded-md overflow-y-scroll"
        style={{
          backgroundColor: currentTheme.background,
          // border: `1px solid ${currentTheme.border}`,
          // boxShadow: `2px 2px 5px ${currentTheme.border}`,
        }}
      >
        {/* <Header /> */}
        <Outlet />
      </section>
    </main>
  )
}
export default OwnerLayout 