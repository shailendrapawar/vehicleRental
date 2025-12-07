import { useState } from "react";
import landingImg from "../assets/landing-left.png";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../hooks/useDarkMode";
import { toggleTheme } from "../store/slices/themeSlice";

const features = [
  {
    icon: (
      <svg
        width="16"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M17 16H3V17C3 17.5523 2.55228 18 2 18H1C0.44772 18 0 17.5523 0 17V7L2.4805 1.21216C2.79566 0.47679 3.51874 0 4.31879 0H15.6812C16.4813 0 17.2043 0.47679 17.5195 1.21216L20 7V17C20 17.5523 19.5523 18 19 18H18C17.4477 18 17 17.5523 17 17V16ZM18 9H2V14H18V9ZM2.17594 7H17.8241L15.6812 2H4.31879L2.17594 7ZM4.5 13C3.67157 13 3 12.3284 3 11.5C3 10.6716 3.67157 10 4.5 10C5.32843 10 6 10.6716 6 11.5C6 12.3284 5.32843 13 4.5 13ZM15.5 13C14.6716 13 14 12.3284 14 11.5C14 10.6716 14.6716 10 15.5 10C16.3284 10 17 10.6716 17 11.5C17 12.3284 16.3284 13 15.5 13Z"
          className="fill-[#434040] dark:fill-[#C5B7B7]"
        />
      </svg>
    ),
    text: "Easy Rentals",
  },
  {
    icon: (
      <svg
        width="16"
        height="20"
        viewBox="0 0 18 22"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M9 18.8995L13.9497 13.9497C16.6834 11.2161 16.6834 6.78392 13.9497 4.05025C11.2161 1.31658 6.78392 1.31658 4.05025 4.05025C1.31658 6.78392 1.31658 11.2161 4.05025 13.9497L9 18.8995ZM9 21.7279L2.63604 15.364C-0.87868 11.8492 -0.87868 6.15076 2.63604 2.63604C6.15076 -0.87868 11.8492 -0.87868 15.364 2.63604C18.8787 6.15076 18.8787 11.8492 15.364 15.364L9 21.7279ZM9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.8954 7 7 7.89543 7 9C7 10.1046 7.8954 11 9 11ZM9 13C6.79086 13 5 11.2091 5 9C5 6.79086 6.79086 5 9 5C11.2091 5 13 6.79086 13 9C13 11.2091 11.2091 13 9 13Z"
          className="fill-[#434040] dark:fill-[#C5B7B7]"
        />
      </svg>
    ),
    text: "Nearby Locations",
  },
  {
    icon: (
      <svg
        width="18"
        height="19"
        viewBox="0 0 20 21"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M20 15.0022C19.999 17.8731 17.9816 20.2726 15.2872 20.8616L14.6492 18.9476C15.8532 18.7511 16.8765 18.0171 17.4649 17H15C13.8954 17 13 16.1046 13 15V11C13 9.8954 13.8954 9 15 9H17.9381C17.446 5.05369 14.0796 2 10 2C5.92038 2 2.55399 5.05369 2.06189 9H5C6.10457 9 7 9.8954 7 11V15C7 16.1046 6.10457 17 5 17H2C0.89543 17 0 16.1046 0 15V10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10V10.9987V11V15V15.0022Z"
          className="fill-[#434040] dark:fill-[#C5B7B7]"
        />
      </svg>
    ),
    text: "24/7 Support",
  },
];

export default function Landing() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme) === "dark";
  useDarkMode(isDark);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-white dark:bg-black">
      <div className="w-[80%] md:w-[90%] lg:w-[80%] lg:max-w-4xl lg:h-auto flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Image Section - Hidden on mobile, visible on md screens and above */}
        <div className="hidden md:block relative w-full md:w-2/5 lg:w-1/2">
          <img
            src={landingImg}
            alt="Vehicles"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 p-5 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg">
          {/* Heading */}
          <div className="font-bold text-[#594848] dark:text-[#F2EEEE]">
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
              The
            </h4>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-center">
              "Local Explorer"
            </h1>
            <h5 className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-right">
              Hero
            </h5>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-sm xl:text-base leading-relaxed text-gray-600 dark:text-[#C9BCBC]">
            Your trusted local partner for convenient and affordable car rentals
            — whether you're a local looking for everyday comfort or a visitor
            exploring the city, we provide the perfect ride to match your
            journey, budget, and style.
          </p>

          {/* Features List */}
          <div className="flex flex-col gap-2 sm:gap-3 text-sm md:text-base lg:text-sm xl:text-base">
            {features.map(({ icon, text }) => (
              <div className="flex items-center gap-2 md:gap-3">
                {icon}
                <span className="font-medium text-[#4D4747] dark:text-[#AA9D9D]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              dispatch(toggleTheme());
            }}
            className="cursor-pointer bg-[#1EADD0] mt-3 md:mt-4 w-full text-white py-1 md:py-2 rounded-lg font-medium hover:bg-[#1795c7] transition text-base md:text-md"
          >
            Start Exploring →
          </button>
        </div>
      </div>
    </div>
  );
}
