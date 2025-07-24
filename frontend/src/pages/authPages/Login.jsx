import { useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import OtpBar from "../../components/otpBar/OtpBar"
import { Link } from "react-router-dom"

const Login = () => {
  const { currentTheme } = useSelector(s => s.theme)
  return (
    <div className="h-full w-full flex justify-center items-center p-1">

      <section className="w-full max-w-100  h-120 rounded-2xl flex flex-col  items-center justify-center gap-5"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <img className="w-30 h-30 rounded-full bg-gray-500"></img>

        <main className="w-full h-auto grid grid-cols-2 gap-2 p-2">
          <InputBox size={"w-full col-span-2 h-10"} placeholder={"Email"} name={"email"}></InputBox>
          <InputBox size={"w-full col-span-2 h-10"} placeholder={"Password"} name={"password"}></InputBox>


        </main>

        <div className="h-10 w-full flex justify-around items-center">
          <Link className="text-sm" to={"/register"}>Not a user? Register here</Link>
          <button className="h-10 w-25 rounded-md text-sm">Login</button>

        </div>



      </section>
    </div>
  )
}
export default Login