import { useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import OtpBar from "../../components/otpBar/OtpBar"
import { Link } from "react-router-dom"

const Login = () => {
  const { currentTheme } = useSelector(s => s.theme)

  const handleChange=(e)=>{

  }
  return (
    <div className="h-full w-full flex justify-center items-center p-1">

      <section className="w-full max-w-100  h-120 rounded-2xl flex flex-col  items-center justify-center gap-5"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <img className="w-30 h-30 rounded-full bg-gray-500"></img>

        <main className="w-full h-auto grid grid-cols-2 gap-2 p-2">
          <InputBox size={"w-full col-span-2 h-10"} placeholder={"Email"} name={"email"} onChange={handleChange}></InputBox>
          <InputBox size={"w-full col-span-2 h-10"} placeholder={"Password"} name={"password"} onChange={handleChange}></InputBox>


        </main>

        <div className="h-10 w-full flex justify-around items-center">
          <span className="text-xs" to={"/register"}> Not a user? <Link to={"/register"} style={{color:currentTheme.accent}}>Register here</Link></span>
          <button className="h-8 w-25 rounded-3xl text-sm active:scale-95 transition-all ease-out cursor-pointer"

          style={{backgroundColor:currentTheme.accent,color:"black"}}
          >Login</button>

        </div>



      </section>
    </div>
  )
}
export default Login