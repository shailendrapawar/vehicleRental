import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import logo from "../../assets/logo.png";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDarkMode from "../../hooks/useDarkMode";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme) === "dark";

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    registerAs: "",
    dob: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleResgister = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password ||
        !userData.registerAs ||
        !userData.dob
      ) {
        toast.error("All feilds are required");
        return;
      }

      const isRegistered = await axios.post(
        import.meta.env.VITE_API_URL + `/auth/register-user`,
        userData,
      );

      if (isRegistered) {
        toast.success(isRegistered.data.message);
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          registerAs: "",
          dob: ""
        });
        navigate("/login");
      }
    } catch (err) {
      console.log("Error in register user",err)
      toast.error(err.response.data.message||"Something went wrong !");
    }
  };

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
          Register
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
          <div className="flex gap-3">
            {/* First Name */}
            <div className="flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>
              <input
                onChange={(e) => handleChange(e)}
                value={userData.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                className="bg-transparent w-full outline-none placeholder-[#bbb0b2] dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
              />
            </div>

            {/* Last Name */}
            <div className="flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>
              <input
                value={userData.lastName}
                onChange={(e) => handleChange(e)}
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="bg-transparent w-full outline-none placeholder-[#bbb0b2] dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Email */}
            <div className="flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
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
              <input
                value={userData.email}
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="bg-transparent w-full outline-none placeholder-[#bbb0b2] dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
              />
            </div>
            {/* Password */}
            <div className="flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
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
              <input
                value={userData.password}
                onChange={(e) => handleChange(e)}
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="bg-transparent w-full outline-none placeholder-[#bbb0b2] dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
              />
            </div>
          </div>

          {/* Date and Register */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* date */}
            <div className="w-full sm:w-1/2 flex gap-1 items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.49967 0.166504V2.49984H15.4997V0.166504H17.833V2.49984H22.4997C23.144 2.49984 23.6663 3.02218 23.6663 3.6665V22.3332C23.6663 22.9775 23.144 23.4998 22.4997 23.4998H1.49967C0.855348 23.4998 0.333008 22.9775 0.333008 22.3332V3.6665C0.333008 3.02218 0.855348 2.49984 1.49967 2.49984H6.16634V0.166504H8.49967ZM21.333 11.8332H2.66634V21.1665H21.333V11.8332ZM6.16634 4.83317H2.66634V9.49984H21.333V4.83317H17.833V7.1665H15.4997V4.83317H8.49967V7.1665H6.16634V4.83317Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>

              <input
                type="date"
                onChange={(e) => handleChange(e)}
                name="dob"
                value={userData.dob}
                className="picker bg-transparent w-full outline-none dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
              />
            </div>

            {/* register */}
            <div className="w-full sm:w-1/2 flex items-center rounded-lg px-3 py-2 dark:bg-[#34363A] bg-gray-100">
              <svg
                width="17"
                height="15"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16699 22.9165C4.16699 18.3141 7.89795 14.5832 12.5003 14.5832C17.1027 14.5832 20.8337 18.3141 20.8337 22.9165H18.7503C18.7503 19.4647 15.9521 16.6665 12.5003 16.6665C9.04854 16.6665 6.25033 19.4647 6.25033 22.9165H4.16699ZM12.5003 13.5415C9.0472 13.5415 6.25033 10.7446 6.25033 7.2915C6.25033 3.83838 9.0472 1.0415 12.5003 1.0415C15.9535 1.0415 18.7503 3.83838 18.7503 7.2915C18.7503 10.7446 15.9535 13.5415 12.5003 13.5415ZM12.5003 11.4582C14.8024 11.4582 16.667 9.59359 16.667 7.2915C16.667 4.98942 14.8024 3.12484 12.5003 3.12484C10.1982 3.12484 8.33366 4.98942 8.33366 7.2915C8.33366 9.59359 10.1982 11.4582 12.5003 11.4582Z"
                  className="dark:fill-[#917E7E] fill-[#CAC1C1]"
                />
              </svg>

              <select
                value={userData.registerAs}
                onChange={(e) => handleChange(e)}
                name="registerAs"
                className="bg-transparent w-full outline-none dark:text-[#b7afaf] text-[#767676] text-sm md:text-base"
                defaultValue=""
              >
                <option value="" disabled>
                  Registering as
                </option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>
          <button
            onClick={(e) => handleResgister(e)}
            type="button"
            className="w-full hover:cursor-pointer bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm md:text-base"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <p className="text-center text-gray-500 dark:text-[#A0A0A0] mt-4 text-sm md:text-base">
          Register using social media
        </p>

        {/* Social Buttons */}
        <div className="flex flex-col gap-2 md:gap-3 mt-3 md:mt-4">
          <button className="flex items-center justify-center border rounded-lg py-2 hover:cursor-pointer dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 text-[#2e2e2e] hover:bg-gray-50 text-sm md:text-base">
            <FcGoogle className="mr-2 text-lg md:text-xl" /> Register with
            Google
          </button>
          <button className="flex items-center justify-center border rounded-lg py-2 hover:cursor-pointer dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 text-[#2e2e2e] hover:bg-gray-50 text-sm md:text-base">
            <FaFacebook className="mr-2 text-blue-600 text-lg md:text-xl" />{" "}
            Register with Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 md:mt-6 dark:text-[#E0E0E0] text-gray-600 text-sm md:text-base">
          Already have an account?
          <button className="text-orange-500 hover:underline focus:outline-none">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
