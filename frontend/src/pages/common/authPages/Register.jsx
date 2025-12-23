import { useSelector } from "react-redux";
import InputBox from "../../../components/inputBox/InputBox";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import logoImg from "/logo.png";
import lightBgImg from "/auth-bg-light.png";
import darkBgImg from "/auth-bg-dark.png";


import { useNavigate } from "react-router";
import { useState } from "react";

import OtpModal from "./OtpModal";
import { toast } from "react-hot-toast"
import AuthService from "../../../services/auth.service";
export default function RegisterPage() {

  const { currentTheme } = useSelector(s => s.theme);
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const [userRegistrationData, setUserRegistrationData] = useState({
    email: "",
    password: "",
    dob: "",
    registerAs: "",
    otp: "",
    purpose: "signup"
  })

  const [toggleOtp, setToggleOtp] = useState(false)

  // any change in form 
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(userRegistrationData)
    setUserRegistrationData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  //toggle otp model(if form is fillled)
  const toggleOtpForm = async (e) => {
    const { email, password, dob, registerAs, purpose } = userRegistrationData;

    //return if any null or empty values
    if (email == "" || password == "" || dob == "" || registerAs == "") {
      toast.error("All fields are mandatory...")
      return
    }

    e.preventDefault();
    console.log("otp toggle called")
    //request for otp as well
    try {
      setloading(true)
      const result = await AuthService.sendOtp({ email, purpose, role: registerAs })
      toast.success(result.message)
      setToggleOtp(true)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }


  // verify otp getting from modal
  const verifyOtp = async (otp) => {
    console.log("otp recived in parent", otp)
  }

  //resend otp if requested from modal
  const resendOtp = async () => {
    console.log("resend otp")
  }

  return (
    <main className={"login-page flex justify-center items-center h-full w-full px-2"}
      style={{
        background: `url(${currentTheme.name === "light" ? lightBgImg : darkBgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >

      <section className={"w-full max-w-130 h-150  rounded-xl flex flex-col justify-evenly items-center px-2"}
        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >

        <h3 className="text-2xl font-semibold" style={{ color: currentTheme.primary }}>Register </h3>

        <img src={logoImg} className="h-30 w-30 rounded-full "
          style={{
            border: `3px solid ${currentTheme.primary}`,
          }}
        ></img>

        {toggleOtp ? (

          <OtpModal size={"h-60 w-full"}
            backgroundColor={currentTheme.background}
            border={`1px solid ${currentTheme.border}`}
            shadow={`2px 2px 5px ${currentTheme.border}`}
            // otp={otp}
            // setOtp={setOtp}
            verifyOtp={verifyOtp}
            resendOtp={resendOtp}
            toggleFunction={setToggleOtp}
          />

        ) : (
          <form className={"h-auto w-full gap-3 flex flex-col items-center"}
            onChange={(e) => handleFormChange(e)}
            onSubmit={(e) => { toggleOtpForm(e) }}
          // onSubmit={}
          >
            <InputBox
              size={"h-10 w-[80%] text-sm"}
              backgroundColor={currentTheme.cardBackground}
              color={currentTheme.textPrimary}
              placeholder={"Enter your email"}
              shadow={` 2px 2px 5px ${currentTheme.border}`}
              border={`1px solid ${currentTheme.border}`}
              type={"email"}
              icon={<MdOutlineEmail className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
              name={"email"}
            />

            <InputBox
              size={"h-10 w-[80%] text-sm"}
              backgroundColor={currentTheme.cardBackground}
              color={currentTheme.textPrimary}
              placeholder={"Enter your password"}
              shadow={` 2px 2px 5px ${currentTheme.border}`}
              border={`1px solid ${currentTheme.border}`}
              type={"password"}
              name={"password"}
              // onChange={handleFormChange}
              icon={<RiLockPasswordLine className="h-5 w-5"
                style={{ color: currentTheme.textSecondary }} />}
            />


            <section className="h-10 w-[80%]  flex gap-2">
              <InputBox
                size={"h-10 w-[50%] text-sm cursor-pointer text-sm"}
                backgroundColor={currentTheme.cardBackground}
                color={currentTheme.textSecondary}
                placeholder={"Date of birth"}
                shadow={` 2px 2px 5px ${currentTheme.border}`}
                border={`1px solid ${currentTheme.border}`}
                type={"date"}
                name={"dob"}
                icon={<FiCalendar className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
              />

              <select className="h-full w-[50%] outline-none text-sm font-semibold px-1 rounded-md cursor-pointer"
                style={{
                  color: currentTheme.primary,
                  backgroundColor: currentTheme.cardBackground,
                  border: '3px solid ' + currentTheme.primary,
                  boxShadow: '2px 2px 5px ' + currentTheme.border
                }}
                name={"registerAs"}
              >
                <option value="" hidden >Register As</option>
                <option value="customer">Customer</option>
                <option value="owner">Owner</option>
              </select>
            </section>

            <button
              className="h-10 w-[80%] rounded-md cursor-pointer text-white active:scale-99 transition-all ease-in"
              style={{
                backgroundColor: currentTheme.primary,
                boxShadow: `2px 2px 5px ${currentTheme.border}`,
                border: `1px solid ${currentTheme.border}`
              }}
              type={"submit"}
            >
              Register {userRegistrationData.registerAs !== "" && (`as ${userRegistrationData?.registerAs?.toUpperCase()}`)}
            </button>

            <span className="text-sm" style={{ color: currentTheme.textSecondary }}>or</span>

            <button className="h-10 w-[80%] flex justify-center items-center gap-2 rounded-md cursor-pointer active:scale-99 transition-all ease-in"
              style={{
                background: currentTheme.cardBackground,
                boxShadow: ` 2px 2px 5px ${currentTheme.border}`,
                border: `1px solid ${currentTheme.border}`
              }}
            ><FcGoogle className="h-7 w-7" />Register with Google</button>
          </form>
        )}

        {!toggleOtp && (<span className="text-sm">Already registered?
          <span className="cursor-pointer ml-1" style={{ color: currentTheme.secondary }}
            onClick={() => navigate("/auth/login")}
          > Login here</span>
        </span>)}

      </section>
    </main>
  );
}
