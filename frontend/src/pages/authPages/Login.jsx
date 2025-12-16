import { useSelector } from "react-redux";

import InputBox from "../../components/inputBox/InputBox";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

  const { currentTheme } = useSelector(s => s.theme);

  return (
    <main className={"login-page flex justify-center items-center h-full w-full px-2"}>

      <section className={"w-full max-w-130 h-150  rounded-xl flex flex-col justify-evenly items-center px-2"}
        style={{
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >
        <h3 className="text-2xl font-semibold" style={{ color: currentTheme.primary }}>Login </h3>

        <img className="h-30 w-30 rounded-full bg-gray-500"></img>


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
          ><FcGoogle className="h-7 w-7" />Login with Google</button>
        </form>

        <span className="text-sm">Not registered yet?
          <span className="cursor-pointer" style={{ color: currentTheme.secondary }}> Register here</span>
        </span>

      </section>
    </main>
  );
}
