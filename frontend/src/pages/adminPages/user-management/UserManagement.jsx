import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import KpiCard from "../../../components/kpiCard/KpiCard";
import { FaUsers } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";
import InputBox from "../../../components/inputBox/InputBox";

const UserManagement = () => {



  const navigate = useNavigate();
  const { currentTheme } = useSelector(s => s.theme)
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")


  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/user/get-users`, {
        withCredentials: true
      })
      console.log(res.data.data.users);
      setUsers(res.data.data.users)
    } catch (error) {

    }
  }

  const fetchKpiData=async()=>{
    try {

      const res=await axios.get(import.meta.env.VITE_API_URL+`/admin/user/kpi-data`,{
        withCredentials:true
      })

      console.log(res);
      
    } catch (error) {
      console.log(error)
    }
  }

  const returnStatus = (status = "unknown", position) => {
    let colorStyle = "";

    switch (status) {
      case "pending": {
        colorStyle = "bg-yellow-400 text-gray-800"
        break
      }
      case "approved": {
        colorStyle = "bg-green-500 text-white"
        break
      }
      case "rejected": {
        colorStyle = "bg-red-500 text-white"
        break
      }
      case "banned": {
        colorStyle = "bg-gray-500 text-white"
        break
      }
      default: {
        colorStyle = "bg-black text-white"
        break
      }
    }

    return (
      <div className={`h-6 max-w-15 px-1 ${position} ${colorStyle} text-xs flex justify-center items-center rounded-full`}
      >
        {status}
      </div>
    )

  }

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "searchQuery") {
      setSearchQuery(value);
    }

  }

  useEffect(() => {
    fetchAllUsers()
  }, [])


  return (
    <div className="min-h-[calc(100vh-100px)]  w-full flex flex-col gap-5">


      <h3 className="w-full text-center my-5 text-xl ">User Management</h3>


      <section className=" w-full gap-5 grid grid-cols-3 ">

        <KpiCard size={" h-35 col-span-3 sm:col-span-1"}
          data={{
            heading: "Total Users",
            number: users?.filter((v, i) => v.role == "customer" || v.role === "owner")?.length || 0
          }}
          icon={<FaUsers className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-3 sm:col-span-1"}
          data={{
            heading: "Total Shop Owners",
            number: users?.filter((v, i) => v.role == "owner")?.length || 0
          }}
          icon={<FaShop className="h-8 w-8 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-3 sm:col-span-1"}
          data={{
            heading: "Total Customers",
            number: users?.filter((v, i) => v.role == "customer")?.length || 0
          }}
          icon={<RiCustomerServiceFill className="h-8 w-8 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

      </section>




      <section className="px-5 overflow-x-scroll py-5 rounded-lg " style={{ backgroundColor: currentTheme.cardBackground }}>

        <div className=" w-full mb-5  flex gap-2 justify-center items-center rounded-lg">
          <InputBox size={"h-10 w-[65%]"}
            placeholder={"Search for user..."}
            value={searchQuery}
            name={"searchQuery"}
            onChange={handleChange}
          />

          <span className="h-10 w-[10%] hidden sm:block rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
          <span className="h-10 w-[10%] hidden sm:block  rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
          <span className="h-10 w-[10%] hidden sm:block  rounded-full"
            style={{ backgroundColor: currentTheme.accent }}
          >
            S
          </span>
        </div>



        <table className="h-auto w-full  rounded-md">

          <thead className="h-10 w-full text-sm px-5">
            <tr className="text-left " style={{ borderBottom: `2px solid ${currentTheme.border}` }}>
              <th className="min-w-auto">User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>



          <tbody className=" w-full px-2">

            {users?.map((v, i) => {
              return <tr key={i} className=" h-15 text-xs"
                style={{ borderBottom: `1px solid ${currentTheme.border}` }}
              >
                <td className="">
                  <div className="flex items-center h-full gap-2">
                    <img src={v?.profilePicture?.url} className="h-10 w-10 rounded-full"></img>{v?.name}
                    {/* <span>{v?.name}</span> */}
                  </div>
                </td>

                <td style={{ color: currentTheme.textSecondary }}>{v?.email}</td>
                <td>{returnStatus(v?.status)}</td>
                <td>{v?.role}</td>
              </tr>
            })}
          </tbody>
        </table>
      </section>


    </div>
  )
}
export default UserManagement