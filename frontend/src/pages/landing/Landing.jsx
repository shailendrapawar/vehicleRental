import { useSelector } from "react-redux";

import landingImg from "/landing-left.png";


import { FaCar } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { useNavigate } from "react-router";

const Landing = () => {

  const { currentTheme } = useSelector(s => s.theme);
  const navigate = useNavigate()


  const landingSummary = "Your trusted local partner for convenient and affordable car rentals — whether you’re a local looking for everyday comfort or a visitor exploring the city, we provide the perfect ride to match your journey, budget, and style."

  const featureList = [
    {
      icon: <FaCar />,
      text: "Wide Selection of Vehicles"
    },
    {
      icon: <FaHeadphonesSimple />,
      text: "24/7 Customer Support"
    },
    {
      icon: <FaLocationDot />,
      text: "Nearby Location"
    }
  ]

  return (
    <main className={"flex justify-center items-center h-full w-full px-2"}
      style={{

      }}
    >

      <div className={"w-full max-w-180 h-160 rounded-xl flex-col sm:flex-row md:flex-row flex justify-evenly items-center overflow-hidden"}
        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >

        <img src={landingImg} alt=""
          className={"w-full h-[40%] object-cover object-center sm:w-[50%] sm:h-full  md:w-[50%] md:h-full "}
        />

        <section className={" w-full h-[60%] sm:  sm:w-[50%] sm:h-full md:w-[50%] md:h-full flex flex-col items-center justify-center px-5"}>

          <span>
            <h3 className="sm:text-2xl font-bold text-left">The</h3>
            <h1 className=" text-2xl sm:text-5xl font-bold text-center">"Local Explorer"</h1>
            <h3 className="sm:text-2xl font-bold text-right">Hero</h3>
          </span>

          <p className="w-full text-xs sm:text-md break-after-auto mt-5"
            style={{
              color: currentTheme.textSecondary
            }}
          >{landingSummary}</p>

          <span className={"h-auto w-full py-2"}>
            {
              featureList.map((feature, index) => (
                <div key={index} className={"w-full flex items-center mt-3 gap-3"}>
                  <div className={"text-lg"}>{feature.icon}</div>
                  <p className={"text-xs sm:text-sm"}
                    style={{ color: currentTheme.textPrimary }}
                  >{feature.text}</p>
                </div>
              ))
            }
          </span>

          <button
            style={{ boxShadow: ` 2px 2px 5px ${currentTheme.border}` }}
            className="w-full h-10 mt-5 rounded-lg text-white bg-blue-500 flex items-center justify-center gap-2 cursor-pointer"
            onClick={()=>navigate("/auth/login")}
          >
            <span>Start Exploring</span><FaArrowRight className=" h-5 w-5" />

          </button>

        </section>

      </div>

    </main>
  )
}
export default Landing