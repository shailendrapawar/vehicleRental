import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import logo from "../../assets/logo.png";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDarkMode from "../../hooks/useDarkMode";
import InputField from "../../components/InputField";

export default function LoginPage() {

  const isDark = useSelector((state) => state.theme) === "dark";

  // custom hook for using dark mode
  useDarkMode(isDark);

  return (
    <div
      className="
        min-h-screen flex items-center justify-center transition-colors duration-500
        bg-center bg-no-repeat bg-cover p-4
        bg-[url('/src/assets/auth-bg-light.png')]
        dark:bg-[url('/src/assets/auth-bg-dark.png')]
      "
    >
      <div
        className="
          dark:bg-[#1E1E1E] dark:text-white bg-white text-black 
          shadow-lg rounded-2xl p-8 md:p-6 lg:p-8 w-full max-w-md 
          transition-colors duration-500
        "
      >
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          {/* <button
            onClick={() => {
              dispatch(toggleTheme());
            }}
            className="px-3 py-1 text-sm rounded-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button> */}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 dark:text-green-400 text-green-600">
          Login
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-4 md:mb-6">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
          />
        </div>

        {/* Form */}
        <form className="space-y-3 md:space-y-4">
          {/* Email */}
          <InputField
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.12467 0.125H19.8747C20.45 0.125 20.9163 0.591375 20.9163 1.16667V17.8333C20.9163 18.4086 20.45 18.875 19.8747 18.875H1.12467C0.549383 18.875 0.0830078 18.4086 0.0830078 17.8333V1.16667C0.0830078 0.591375 0.549383 0.125 1.12467 0.125ZM18.833 4.5395L10.5745 11.9354L2.16634 4.5166V16.7917H18.833V4.5395ZM2.69911 2.20833L10.5642 9.14792L18.3132 2.20833H2.69911Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>
            }
            type="email"
            placeholder="Enter Your Email"
          />

          <InputField
            icon={
              <svg
                width="15"
                height="15"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.2222 10H23.6111C24.3782 10 25 10.5596 25 11.25V23.75C25 24.4404 24.3782 25 23.6111 25H1.38889C0.621833 25 0 24.4404 0 23.75V11.25C0 10.5596 0.621833 10 1.38889 10H2.77778V8.75C2.77778 3.91751 7.13057 0 12.5 0C17.8694 0 22.2222 3.91751 22.2222 8.75V10ZM2.77778 12.5V22.5H22.2222V12.5H2.77778ZM11.1111 15H13.8889V20H11.1111V15ZM19.4444 10V8.75C19.4444 5.29822 16.3353 2.5 12.5 2.5C8.66469 2.5 5.55556 5.29822 5.55556 8.75V10H19.4444Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>
            }
            type="password"
            placeholder="Enter Your Password"
          />

          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm md:text-base"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <p className="text-center text-gray-500 dark:text-[#A0A0A0] mt-4 text-sm md:text-base">
          Login using social media
        </p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-2 md:gap-3 mt-3 md:mt-4">
          <button className="flex items-center justify-center border rounded-lg py-2 hover:cursor-pointer dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 text-[#2e2e2e] hover:bg-gray-50 text-sm md:text-base">
            <FcGoogle className="mr-2 text-lg md:text-xl" />{" "}
            Login with Google
          </button>
          <button className="flex items-center justify-center border rounded-lg py-2 hover:cursor-pointer dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 text-[#2e2e2e] hover:bg-gray-50 text-sm md:text-base">
            <FaFacebook className="mr-2 text-blue-600 text-lg md:text-xl" />{" "}
            Login with Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 md:mt-6 dark:text-[#E0E0E0] text-gray-600 text-sm md:text-base">
          Don't have an account?
          <button
            className="text-orange-500 hover:underline focus:outline-none"
          >
             Register here
          </button>
        </p>
      </div>
    </div>
  );
}
