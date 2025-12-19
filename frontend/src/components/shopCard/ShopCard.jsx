import { useSelector } from "react-redux";
import { useState } from "react";

import { FaCar } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ShopCard = ({ title, city, address }) => {
    const { currentTheme } = useSelector(s => s.theme);

    const [commonTheme] = useState({ color: currentTheme.secondary });

    return (
        <div className="h-80 min-w-80 rounded-[10px] flex flex-col p-2"
            style={{
                backgroundColor: currentTheme.cardBackground,
                border: `1px solid ${currentTheme.border}`,
                boxShadow: `2px 2px 5px ${currentTheme.border}`,
            }}
        >

            <img className="h-[60%] w-full bg-gray-500 rounded-[8px]"></img>

            <div className="h-[30%] w-full  flex flex-col">
                <span className="h-5 text-sm font-semibold w-full">
                    {title || "Shop Name"}
                </span>
                <span className="text-xs " style={{ color: currentTheme.textSecondary }}>
                    {city || "City"}.{address || "address"}
                </span>

                <section className="grid grid-cols-2  p-2 gap-1">
                    <span className="col-span-1 flex text-xs items-center gap-1" style={{ color: currentTheme.textSecondary }}><FaCar /> Vehicle: <b style={{ color: currentTheme.secondary }}>3</b></span>
                    <span className=" col-span-1 flex text-xs items-center gap-1" style={{ color: currentTheme.textSecondary }}><MdLock />Booked: <b style={{ color: currentTheme.secondary }}>2</b></span>
                    <span className="col-span-1  flex text-xs items-center gap-1" style={{ color: currentTheme.textSecondary }}><FaCheckCircle /> Available:<b style={{ color: currentTheme.secondary }}>1</b></span>
                    <span className=" col-span-1  flex text-xs items-center gap-1" style={{ color: currentTheme.textSecondary }}><RiMoneyRupeeCircleFill /> Earning: <b style={{ color: currentTheme.secondary }}>$ 3</b></span>
                </section>

            </div>

            <button className=" h-[10%] rounded-md text-white hover:opacity-90 cursor-pointer  "
                style={{ backgroundColor: currentTheme.secondary }}
            >Visit</button>

        </div>
    )
}
export default ShopCard