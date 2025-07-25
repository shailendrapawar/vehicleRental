import { useDispatch, useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

import { setCredentials } from "../../store/slices/authSlice"
import { decodeToken } from "../../utils/decodeToken"


const Login = () => {


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const { currentTheme } = useSelector(s => s.theme)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const[isLoading,setIsLaoding]=useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  // #==== handle login action========#
  const handleSubmit = async (e) => {
    e.preventDefault();
    //basic validation
    if (loginData.email === "" || loginData.password === "") {
      toast.error("All fields are required");
      return;
    }
    if (!emailRegex.test(loginData.email)) {
      toast.error("Invalid email");
      return
    }

    // hitting login api
    try {
      const loginPromise =  axios.post(import.meta.env.VITE_API_URL + `/auth/user-login`, loginData, {
        withCredentials: true
      })
      toast.promise(loginPromise,{
        loading:"Loading...",
        success:"User logged in 😁",
        // error:""
      })
      const isLogin=await loginPromise
    
      const token=isLogin.data.data.token
      const user=decodeToken(token)
      dispatch(setCredentials(user))

      setTimeout(() => {
        navigate(`/${user.role}`)
      }, 1000);

      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg);
    }
  }


  return (
    <div className="h-full w-full flex justify-center items-center p-1">

      <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-100  h-120 rounded-2xl flex flex-col  items-center justify-center gap-5"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <img className="w-30 h-30 rounded-full bg-gray-500"></img>

        <main className="w-full h-auto grid grid-cols-2 gap-2 p-2">
          <InputBox size={"w-full col-span-2 h-10"}
            type={"text"}
            placeholder={"Email"}
            name={"email"}
            value={loginData.email}
            onChange={handleChange}
            required={true}
          ></InputBox>

          <InputBox size={"w-full col-span-2 h-10"}
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            value={loginData.password}
            onChange={handleChange}
            required={true}></InputBox>
        </main>

        <div className="h-10 w-full flex justify-around items-center">
          <span className="text-xs" to={"/register"}> Not a user? <Link to={"/register"} style={{ color: currentTheme.accent }}>Register here</Link></span>

          <button type={"submit"} className="h-8 w-25 rounded-3xl text-sm active:scale-95 transition-all ease-out cursor-pointer"
            style={{ backgroundColor: currentTheme.accent, color: "black" }}
          >Login</button>

        </div>
      </form>
    </div>
  )
}
export default Login