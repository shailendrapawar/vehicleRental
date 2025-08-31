import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { formatDate, normalizeDate } from "../../../utils/dateHandler";

const SingleUserManagement = () => {

  const { userId } = useParams();

  const { currentTheme } = useSelector(s => s.theme)

  const [userData, setUserData] = useState({})
  const [userNewStatus, setUserNewStatus] = useState("")

  // console.log(userId)

  const fetchUserDetail = async () => {

    if (!userId) return

    try {

      const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/user/get-users/${userId}`, {
        withCredentials: true
      })
      console.log(res.data.data.user);
      setUserData(res.data.data.user)
      setUserNewStatus(res.data.data.user.status)

    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {

    fetchUserDetail()

  }, [userId])

  if (!userId) return

  return (
    <div className="min-h-[calc(100vh-100px)] w-full ">

      <section className="h-10 w-full flex items-center">

        <button className="h-10 w-20 bg-blue-500 rounded-md">
          back
        </button>

      </section>



      <main className="mt-5 w-full h-auto  gap-2 py-2 grid  grid-cols-5 grid-rows-2 sm:grid-rows-1">

        <div className=" h-70 overflow-hidden col-span-5 sm:col-span-3 rounded-md relative"
          style={{ backgroundColor: currentTheme.cardBackground }}
        >
          <div className="h-[30%] bg-white w-full"> </div>

          <img className="h-25 w-25 rounded-full bg-gray-500 absolute top-[10%] left-[5%]">
          </img>

          <span className="absolute top-[35%] right-2 flex flex-col rounded-md text-xs md:text-md bg-gray-900 px-2 py-2">
            <div>{userData?.name || ""}</div>
            <div>ID: {userData?._id || ""}</div>
          </span>

          <section className="flex flex-col gap-1.5 absolute bottom-4 left-[5%] text-xs">
            <span className="flex gap-2 items-center"><MdEmail className="h-4 w-4" />{userData?.email}</span>
            <span className="flex gap-2 items-center"><FaUser className="h-4 w-4" />{userData?.role}</span>
            <span className="flex gap-2 items-center"><IoTime className="h-4 w-4" />{normalizeDate(userData?.lastLogin)}</span>
            <span className="flex gap-2 items-center">< BsCalendarDateFill className="h-4 w-4" />Member since : {formatDate(userData?.createdAt)}</span>
          </section>
        </div>


        <div className=" h-70 p-4 col-span-5  sm:col-span-2 rounded-md relative"
          style={{ backgroundColor: currentTheme.cardBackground }}
        >
          <h3 className="font-bold">User's Location</h3>

          <div className="w-full  flex gap-2 mt-2 text-xs m"><FaLocationDot className="h-5 w-5" style={{ color: currentTheme.accent }} /><span>{userData?.location || "Not configured"}</span></div>
          <span className=" absolute bottom-4 left-4 text-lg"><span>Current Status : </span>
            <select className={`h-8 w-20 outline-none cursor-pointer  rounded-md text-sm `}
              style={{ backgroundColor: currentTheme.secondary }}
              onChange={(e) => setUserNewStatus(e.target.value)}
              value={userNewStatus}
            >
              <option value={"approved"}>Apporved</option>
              <option value={"banned"}>Banned</option>
            </select></span>
        </div>
      </main>



      {userData?.status !== userNewStatus && (
        <div className=" w-full h-15 flex items-center px-2 gap-2 rounded-md"
          style={{ backgroundColor: currentTheme.cardBackground }}
        >
          <input className="w-[70%] sm:w-[80%] md:w-[90%] h-10 outline-none px-2 text-xs sm:text-md"
            placeholder={`Enter reason for ${userNewStatus}`} style={{ borderBottom: `2px solid ${currentTheme.border}` }}></input>
          <button className="h-10 w-[30%] sm:w-[20%] md:w-[10%] bg-green-400 rounded-md"
            style={{ backgroundColor: currentTheme.primary }}
          >Update</button>
        </div>
      )}



{/* ========== history=============== */}
      <div>
        history
      </div>

    </div>
  )
}
export default SingleUserManagement 