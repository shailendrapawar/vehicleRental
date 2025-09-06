import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import AdminShopCard from "../../../components/adminShopCard/AdminShopCard";
import KpiCard from "../../../components/kpiCard/KpiCard";


import { FaShop } from "react-icons/fa6";
import { IoCopy } from "react-icons/io5";

import InputBox from "../../../components/inputBox/InputBox";
import { useNavigate } from "react-router-dom";

const ShopManagement = () => {

   const { currentTheme } = useSelector(s => s.theme)
   const navigate=useNavigate();

  const [searchQuery, setSearchQuery] = useState();

  const[kpiData,setKpiData]=useState({})

  const [shops, setShops] = useState([]);




  const fetchAllShops = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/shop/get-shops`, {
        withCredentials: true
      })
      // console.log(res.data.data.shops)
      setShops(res.data.data.shops)
    } catch (error) {

      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const getKpiData=async()=>{
    try {

      const res= await axios.get(import.meta.env.VITE_API_URL+`/admin/shop/kpi-data`,{
        withCredentials:true
      })
      console.log(res.data.data)
      setKpiData(res.data.data)
    
    } catch (error) {
      console.log(err)
    }
  }

   const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "searchQuery") {
      setSearchQuery(value);
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


  useEffect(() => {
    fetchAllShops();
    // getKpiData();
  }, [])

  return (

    <div className="h-[calc(100vh-80px)] w-fulll flex flex-col relative">

      <h3 className="w-full text-center my-5 text-xl ">Shop Management</h3>

      <section className=" w-full gap-5 grid grid-cols-3 ">

        <KpiCard size={" h-35 col-span-3 sm:col-span-1"}
          data={{
            heading: "Total Shops",
            number:kpiData?.totalShops?.[0]?.totalShops||0
          }}
          icon={<FaShop className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
        />

        <KpiCard size={" h-35 col-span-3 sm:col-span-1"}
          data={{
            heading: "Banned Shops",
            number: kpiData?.totalUsers || 0
          }}
          icon={<FaShop className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentTheme.accent }} />}
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
              <th className="min-w-auto">Shop Name</th>
              <th>City</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Submissions</th>
            </tr>
          </thead>



          <tbody className=" w-full px-2">

            {shops?.map((v, i) => {
              return <tr key={i} className=" h-15 text-xs"
                style={{ borderBottom: `1px solid ${currentTheme.border}` }}
                onClick={()=>navigate(`/admin/manage-shops/${v._id}`)}
              >
                <td className="">
                  <div className="flex items-center h-full gap-2">
                    {/* <img src={v?.profilePicture?.url} className="h-10 w-10 rounded-full"></img>{v?.name} */}
                    <span>{v?.name?.toUpperCase()}</span>
                  </div>
                </td>

                <td style={{ color: currentTheme.textSecondary }}>{v?.location?.city}</td>
                <td>{returnStatus(v?.status)}</td>
                <td>{v?.owner?.name}<br/><span style={{color:currentTheme.textSecondary}} className="text-[8px] flex gap-1">{v?.owner?._id}<IoCopy/></span></td>
                <td className="font-bold" style={{color:currentTheme.accent}}>{v?.submissionCount}</td>
              </tr>
            })}
          </tbody>
        </table>


        </section>


    </div>

  )
}
export default ShopManagement