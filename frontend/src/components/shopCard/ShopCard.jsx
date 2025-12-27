import { useSelector } from "react-redux";
import { useState } from "react";

import { FaCar } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdLock } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const ShopCard = ({data}) => {
    const { currentTheme } = useSelector(s => s.theme);

    const [commonTheme] = useState({ color: currentTheme.secondary });

    const navigate=useNavigate();


    // console.log(data)
    // if(!data) return

    return (
        <div className="h-80 min-w-80 rounded-[10px] flex flex-col p-2"
            style={{
                backgroundColor: currentTheme.cardBackground,
                border: `1px solid ${currentTheme.border}`,
                boxShadow: `2px 2px 5px ${currentTheme.border}`,
            }}
        >

            <img className="h-[55%] w-full bg-gray-500 rounded-[8px]"></img>

            <div className="h-[35%] w-full  flex flex-col justify-evenly">
                <span className="h-5 text-sm font-semibold w-full">
                    {data?.name?.toUpperCase()  }
                </span>
                <span className="text-xs " style={{ color: currentTheme.textSecondary }}>
                    {data?.location?.city?.toUpperCase() || "City"} • {data?.location?.address || "address"}
                </span>

                <section className="grid grid-cols-2  p-2 gap-1">
                    <span className="col-span-1 flex text-xs items-center gap-1" ><FaCar style={{ color: currentTheme.secondary }} /> Vehicles: <b >3</b></span>
                    <span className="col-span-1 flex text-xs items-center gap-1" ><FaCheckCircle style={{ color: currentTheme.secondary }} /> Booked: <b >3</b></span>

                    <span className="col-span-1 flex text-xs items-center gap-1" ><MdLock style={{ color: currentTheme.secondary }} /> Avaliable: <b >3</b></span>
                    <span className="col-span-1 flex text-xs items-center gap-1" ><RiMoneyRupeeCircleFill style={{ color: currentTheme.secondary }} /> Earnings: <b >$893</b></span>
                </section>

            </div>

            <button className=" h-[10%] rounded-md text-white hover:opacity-90 active:opacity-80 cursor-pointer  "
                style={{ backgroundColor: currentTheme.secondary }}
                onClick={()=>navigate(`/owner/shops/${data?._id}`)}
            >Visit</button>

        </div>
    )
}
export default ShopCard