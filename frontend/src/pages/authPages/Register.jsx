import { useSelector } from "react-redux";
import InputBox from "../../components/inputBox/InputBox";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import logoImg from "/public/logo.png";
import lightBgImg from "/public/auth-bg-light.png";
import darkBgImg from "/public/auth-bg-dark.png";


import { useNavigate } from "react-router";



export default function RegisterPage() {

  const { currentTheme } = useSelector(s => s.theme);
  const navigate = useNavigate();

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
          backgroundColor:currentTheme.cardBackground,
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

        <form className={"h-auto w-full gap-3 flex flex-col items-center"}>
          <InputBox
            size={"h-10 w-[80%] text-sm"}
            backgroundColor={currentTheme.cardBackground}
            color={currentTheme.textPrimary}
            placeholder={"Enter your email"}
            shadow={` 2px 2px 5px ${currentTheme.border}`}
            border={`1px solid ${currentTheme.border}`}
            type={"email"}
            icon={<MdOutlineEmail className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
          />

          <InputBox
            size={"h-10 w-[80%] text-sm"}
            backgroundColor={currentTheme.cardBackground}
            color={currentTheme.textPrimary}
            placeholder={"Enter your password"}
            shadow={` 2px 2px 5px ${currentTheme.border}`}
            border={`1px solid ${currentTheme.border}`}
            type={"password"}
            icon={<RiLockPasswordLine className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
          />


          <section className="h-10 w-[80%]  flex gap-2">
            <InputBox
              size={"h-10 w-[50%] text-sm cursor-pointer text-sm"}
              backgroundColor={currentTheme.cardBackground}
              color={currentTheme.textSecondary}
              placeholder={"Enter your password"}
              shadow={` 2px 2px 5px ${currentTheme.border}`}
              border={`1px solid ${currentTheme.border}`}
              type={"date"}
              icon={<FiCalendar className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
            />

            <select className="h-full w-[50%] outline-none text-sm font-semibold px-1 rounded-md cursor-pointer"
              style={{
                color: currentTheme.primary,
                backgroundColor: currentTheme.cardBackground,
                border: '3px solid ' + currentTheme.primary,
                boxShadow: '2px 2px 5px ' + currentTheme.border
              }}
            >
              <option value="" disabled selected>Register As</option>
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
          >
            Register
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

        <span className="text-sm">Already registered?
          <span className="cursor-pointer ml-1" style={{ color: currentTheme.secondary }}
            onClick={() => navigate("/login")}
          > Login here</span>
        </span>

      </section>
    </main>
  );
}
