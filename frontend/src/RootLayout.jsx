import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const RootLayout = () => {

  const { currentTheme } = useSelector(s => s.theme);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center"
      style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary }}
    >
      {/* commong components  */}
      <main className="w-full h-full  max-w-250 cursor-pointer">
        <Outlet />
      </main>
    </div>
  )
}
export default RootLayout