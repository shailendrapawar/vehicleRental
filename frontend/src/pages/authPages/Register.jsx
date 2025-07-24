import { useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import OtpBar from "../../components/otpBar/OtpBar"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { IoCaretBackCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast"

const Register = () => {
  const { currentTheme } = useSelector(s => s.theme)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


  const [step, setStep] = useState(1);
  const [registerOtp, setRegisterOtp] = useState("");
  const [otpLength, setOtpLength] = useState(4)

  const [verifyToggle, setVerifyToggle] = useState(false)

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

    if(name==="dob"){
      const is18=isAtLeast18YearsOld(value);
      if(!is18){
        toast.error("Invalid date, Must be 18 or above");
        return
      }
    }
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }))
    console.log(registerData)
  }


  // 2: handle get otp
  const handleGetOtp = async () => {

  }

  //3:  handle verify email
  const handleVerifyOtp = async () => {
    if (otpLength !== registerOtp.length) {
      toast.error("Otp length is invalid");
      return
    }
    //send api to handle otp veriication and then register

    console.log("fine, submitting", { ...registerData, registerOtp })
  }


  // 4 handle next step 
  const handleNext = (e) => {
    e.preventDefault();
    if (step > 2 && registerData.firstName == "" ||
      registerData.lastName == "" ||
      registerData.email == "" ||
      registerData.password == "" ||
      registerData.dob == "" ||
      registerData.registerAs == ""
    ) {
      toast.error("enter all fields")
      return
    }
    setStep(2)
    // send intial otp code
  }


  // 5: check dateOfBirth
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
              <option value={"owner"}>Vehicle Owner </option>
            </select>

            {emailRegex.test(registerData.email) && (<button className="col-span-2 rounded-md mt-5 h-8 active:scale-95 transition-all ease-out"
              onClick={handleNext}
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
              className="h-8 w-25 rounded-3xl active:scale-95 transition-all ease-out"
              style={{ backgroundColor: currentTheme.accent }}
            >Verify OTP</button>)}

            <h3 className="text-sm"
            style={{color:currentTheme.textSecondary}}
            >Didn't received code? <span style={{color:currentTheme.accent}}>Resend</span> </h3>

          </main>
        )}

        {step===1 && (<span className="text-xs"
        style={{color:currentTheme.textSecondary}}
        >Already a user? <Link className="" style={{color:currentTheme.accent}}>Login</Link></span>)}





      </section>
    </div>
  )
}
export default Register