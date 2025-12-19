import { useSelector } from "react-redux"
import { Outlet } from "react-router"
import OwnerNavbar from "../components/ownerNavbar/OwnerNavbar";

import Header from "../components/header/Header";

const OwnerLayout = ({ childern }) => {

  const { currentTheme } = useSelector(s => s.theme);
  // console.log("Current theme in owner layout:", currentTheme);
  return (
    <main className=" w-screen h-screen flex p-5 gap-5"
    //  style={{ backgroundColor: currentTheme.background }}
    >
      <OwnerNavbar />
      <section className="w-full h-full rounded-md overflow-y-scroll"
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