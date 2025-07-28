import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const RootLayout = () => {

  const { currentTheme } = useSelector(s => s.theme);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col justify-center items-center"
      style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary }}
    >
      {/* commong components  */}
      <main className="w-full min-h-screen h-auto  max-w-250 cursor-pointer px-5">
        <Outlet />
      </main>
    </div>
  )
}
export default RootLayout