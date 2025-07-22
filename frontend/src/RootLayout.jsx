import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="w-screen h-screen bg-green-300 flex flex-col justify-center items-center">

      {/* commong components  */}
        <main  className="w-full h-full bg-red-500 max-w-250">
        <Outlet/>
        </main>
    </div>
  )
}
export default RootLayout