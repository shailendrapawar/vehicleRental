import { useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import OtpBar from "../../components/otpBar/OtpBar"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { IoCaretBackCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast"

import axios from "axios";


const Register = () => {
  const { currentTheme } = useSelector(s => s.theme)

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const [step, setStep] = useState(1);
  const [registerOtp, setRegisterOtp] = useState("");
  const [otpLength, setOtpLength] = useState(4)
  
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    registerAs: "",
  })


  // 1: handle all changing data
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const is18 = isAtLeast18YearsOld(value);
      if (!is18) {
        toast.error("Invalid date, Must be 18 or above");
        return
      }
    }
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }))
  }



  // 2: handle get otp
  const handleGetOtp = async () => {
    try {
      const otpPromise = axios.post(import.meta.env.VITE_API_URL + `/auth/send-otp`, {
        email: registerData.email,
        purpose: "signup",
        role: registerData.registerAs
      }, {
        withCredentials: true
      })

      toast.promise(otpPromise, {
        loading: "Sending Otp",
        success: "Otp sent to your email"
      })

      await otpPromise;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg)
    }
  }

  //3:  handle verify OTP
  const handleVerifyOtp = async () => {
    if (otpLength !== registerOtp.length) {
      toast.error("Otp length is invalid");
      return
    }

    //verify otp
    try {
      const verifyOtpPromise = axios.post(import.meta.env.VITE_API_URL + `/auth/verify-otp`, {
        email: registerData.email,
        purpose: "signup",
        role: registerData.registerAs,
        code: registerOtp
      }, {
        withCredentials: true
      })

      toast.promise(verifyOtpPromise, {
        loading: "Verifying Otp",
      })

      await verifyOtpPromise;
      // register the user==========
      registerUser()

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }



  // 4: handle next step 
  const handleNext = async (e) => {
    e.preventDefault();
    if (step > 2 && registerData.firstName == "" ||
      registerData.lastName == "" ||
      registerData.email == "" ||
      registerData.password == "" ||
      registerData.dob == "" ||
      registerData.registerAs == ""
    ) {
      toast.error("Enter all fields")
      return
    }
    setStep(2)
    // send intial otp code
    handleGetOtp();
  }


  // 5: register user

  const registerUser = async () => {
    try {
      const registerUserPromise = axios.post(import.meta.env.VITE_API_URL + `/auth/user-registration`, {
        ...registerData,
        registerOtp: registerOtp
      }, {
        withCredentials: true
      })

      toast.promise(registerUserPromise, {
        success: `Account created...😍`,
        loading: "Creating user...",
      })

      await registerUserPromise;

      setTimeout(() => {
        navigate("/login")
      }, 1000);

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }



  // 6: check dateOfBirth
  function isAtLeast18YearsOld(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    const ageDate = new Date(
      birthDate.getFullYear() + 18,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    return ageDate <= today;
  }

  return (
    <div className="h-full w-full flex justify-center items-center p-1">

      <section className="w-full max-w-100  h-120 rounded-2xl flex flex-col  items-center justify-center gap-5"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <img className="w-30 h-30 rounded-full bg-gray-500"></img>

        {
          step == 1 && (<form onSubmit={(e) => { handleNext(e) }} className="w-full h-auto grid grid-cols-2 gap-2 p-2">
            <InputBox size={"w-full h-10"}
              value={registerData.firstName}
              onChange={handleChange}
              placeholder={"First name"}
              type={"text"}
              name={"firstName"}
              required
            ></InputBox>

            <InputBox size={"w-full h-10"}
              value={registerData.lastName}
              onChange={handleChange}
              placeholder={"Last name"}
              type={"text"}
              name={"lastName"}
              required
            ></InputBox>

            <InputBox size={"w-full col-span-2 h-10"}
              value={registerData.email}
              onChange={handleChange}
              placeholder={"Email"}
              name={"email"}
              type={"email"}
              required
            ></InputBox>

            <InputBox size={"w-full col-span-2 h-10"}
              value={registerData.password}
              onChange={handleChange}
              placeholder={"Password"}
              name={"password"}
              type={"text"}
              required
            ></InputBox>

            <input type="date" name="dob"
              value={registerData.dob}
              onChange={(e) => handleChange(e)}
              required
              className="text-xs h-6 p-2 rounded-4xl text-center outline-none select-none"
              style={{ backgroundColor: currentTheme.background }}
            ></input>

            <select className="text-xs text-center text-black outline-none rounded-4xl"
              value={registerData.registerAs}
              onChange={(e) => handleChange(e)}
              name="registerAs"
              required
              style={{ backgroundColor: currentTheme.accent }}
            >
              <option value={""}>Register as</option>
              <option value={"customer"}>User</option>
              <option value={"owner"}>Vehicle Owner</option>
            </select>

            {emailRegex.test(registerData.email) && (<button className="col-span-2 rounded-3xl mt-5 h-10 active:scale-95 transition-all ease-out cursor-pointer text-black"

              type={"submit"}
              style={{ backgroundColor: currentTheme.accent }}
            >Verify Email</button>)}
          </form>)
        }


        {step === 2 && (
          <main className="w-full h-[50%] flex justify-center items-center flex-col gap-5 relative">

            <IoCaretBackCircleSharp className="h-8 w-8 absolute left-2 top-2 active:scale-95 transition-all ease-out"
              onClick={() => setStep(1)}
              style={{ color: currentTheme.accent }} />

            <h3 className="text-sm" style={{ color: currentTheme.textPrimary }}>Enter OTP sent to your mail</h3>

            <OtpBar size={"w-50"} length={otpLength} setParentOtp={setRegisterOtp} />

            {registerOtp && (<button
              onClick={handleVerifyOtp}
              className="h-8 w-25 rounded-3xl active:scale-95 transition-all ease-out cursor-pointer text-black text-sm"
              style={{ backgroundColor: currentTheme.accent }}
            >Verify OTP</button>)}

            <h3 className="text-sm"
              style={{ color: currentTheme.textSecondary }}
            >Didn't received code? <span style={{ color: currentTheme.accent }}
              onClick={() => handleGetOtp()}
            >Resend</span> </h3>

          </main>
        )}

        {step === 1 && (<span className="text-xs"
          style={{ color: currentTheme.textSecondary }}
        >Already a user? <Link to={"/login"} className="" style={{ color: currentTheme.accent }}>Login</Link></span>)}





      </section>
    </div>
  )
}
export default Register