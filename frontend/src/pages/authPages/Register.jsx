import { useSelector } from "react-redux";
import InputBox from "../../components/inputBox/InputBox";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

export default function RegisterPage() {

  const { currentTheme } = useSelector(s => s.theme);

  return (
    <main className={"login-page flex justify-center items-center bg-red-400 h-full w-full px-2"}>
      <section className={"w-full max-w-130 h-150 bg-white rounded-xl flex flex-col items-center px-2"}>

        <h3>Register Page</h3>

        <img className="h-20 w-20 rounded-full bg-gray-500"></img>

        <form className={"h-[50%] w-full bg-gree-500 flex flex-col items-center"}>
          <InputBox
            size={"h-10 w-[80%]"}
            backgroundColor={currentTheme.cardBackground}
            color={currentTheme.textPrimary}
            placeholder={"Enter your email"}
            shadow={` 2px 2px 5px ${currentTheme.border}`}
            border={`1px solid ${currentTheme.border}`}
            type={"email"}
            icon={<MdOutlineEmail className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
          />

          <InputBox
            size={"h-10 w-[80%]"}
            backgroundColor={currentTheme.cardBackground}
            color={currentTheme.textPrimary}
            placeholder={"Enter your password"}
            shadow={` 2px 2px 5px ${currentTheme.border}`}
            border={`1px solid ${currentTheme.border}`}
            type={"password"}
            icon={<RiLockPasswordLine className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
          />


          <section className="h-10 w-[80%] bg-blue-500 flex gap-2">
            <InputBox
              size={"h-10 w-[50%] text-sm cursor-pointer"}
              backgroundColor={currentTheme.cardBackground}
              color={currentTheme.textPrimary}
              placeholder={"Enter your password"}
              shadow={` 2px 2px 5px ${currentTheme.border}`}
              border={`1px solid ${currentTheme.border}`}
              type={"date"}
              icon={<FiCalendar className="h-5 w-5" style={{ color: currentTheme.textSecondary }} />}
            />

            <select className="h-full w-[50%] outline-none text-sm px-1 rounded-md cursor-pointer"
              style={{
                color: currentTheme.textPrimary,
                backgroundColor: currentTheme.cardBackground,
                border: '1px solid ' + currentTheme.border
              }}
            >
              <option value="" disabled selected>Select Gender</option>
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </section>

        </form>

      </section>
    </main>
  );
}
