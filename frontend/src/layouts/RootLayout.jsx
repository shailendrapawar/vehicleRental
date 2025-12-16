import { useSelector } from "react-redux"
import { Outlet } from "react-router";

const RootLayout = () => {
  const { currentTheme } = useSelector(s => s.theme);
// console.log(currentTheme)
  return (
    <main className={`h-screen w-screen flex justify-center items-center`}
      style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary }}
    >
      <section className="h-full w-full">
        <Outlet />
      </section>
    </main>
  )
}
export default RootLayout 