import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom"
import defaultShopImg from "../../assets/default-shop-img.jpeg"
import axios from "axios";
import { useSelector } from "react-redux"
import Tag from "../../components/tag/Tag";

import { IoCaretBackCircle } from "react-icons/io5";

const SingleShop = () => {
  const { currentTheme } = useSelector(s => s.theme)
  const{user}=useSelector(s=>s.auth)
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [vehicleTypes, setVehicleTypes] = useState(["scooty", "bike", "car"])

  // console.log(shopId)

  const [shop, setShop] = useState(null)

  const searchSingleShop = async () => {

    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/owner/get-single-shop/${shopId}`, {
        withCredentials: true
      })
      console.log(res.data.data);
      setShop(res.data.data);
      // setShop()

    } catch (error) {
      navigate(-1)
      console.log(error)
    }

  }

      function returnStatus(status) {
        switch (status) {
            case "verified": {
                return (<div className={`w-auto px-2 sm:px-3  h-6 sm:h-8 sm:text-lg rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-green-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500`}></span>
                </div>)
            }

            case "banned": {
                return (<div className={`w-auto px-2 sm:px-3  h-6 sm:h-8 sm:text-lg rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-red-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500`}></span>
                </div>)
            }

            case "rejected": {
                return (<div className={`w-auto px-2 sm:px-3  h-6 sm:h-8 sm:text-lg  rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-gray-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-gray-500`}></span>
                </div>)
            }

            default: {
                return (<div className={`w-auto px-2 sm:px-3 h-6 sm:h-8 sm:text-lg rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-yellow-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500`}></span>
                </div>)
            }
        }
    }


  useEffect(() => {
    searchSingleShop()
  }, []);


  if (!shopId) return
  if (!shop) return (<h3>Loading...</h3>)

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] h-auto flex flex-col gap-5`}>

        <IoCaretBackCircle className="w-8 h-8 transition-all ease-in-out active:scale-90" onClick={()=>navigate(-1)}/>

      <section className={`w-full h-80 sm:h-100  bg-green-300 rounded-xl overflow-hidden relative`}>


        <img src={defaultShopImg} className={`object-cover h-full w-full grayscale-50`}></img>
        <img src={shop?.owner?.profilePicture?.url} className={`h-25 w-25 sm:h-30 sm:w-30 md:h-35 md:w-35 rounded-full absolute bottom-5 right-5 shadow-black shadow-sm active:scale-95 transition-all ease-in-out`}></img>

        {user?.role==="owner" && returnStatus(shop?.status)}

      </section>


      <main className={`h-auto w-full  flex flex-col gap-1 sm:px-10`}>

        <span className={`h-6 w-18 sm:h-8 sm:w-28 text-center text-xs sm:text-lg flex justify-evenly items-center rounded-full self-end ${currentTheme?.isActive ? "text-green-500" : "text-red-500"}`}
          style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.border}` }}
        >{shop?.isActive ? "OPEN" : "CLOSED"}<b className={`h-2 w-2 sm:h-4 sm:w-4 rounded-full ${currentTheme?.isActive ? "bg-green-500" : "bg-red-500"}`}></b></span>

        <h3 className="sm:text-3xl">{shop?.name?.toUpperCase()}</h3>

        <p className={`w-full h-auto p-1 sm:text-lg break-words font-light  text-xs`}
          style={{ color: currentTheme.textSecondary }}
        >Description for a simple shop</p>

        <span
          className={`text-sm sm:text-lg`}
          style={{ color: currentTheme.secondary }}>📍Location: {shop?.location?.address}, {shop?.location?.city} </span>

        <div className="w-full h-10  flex gap-2 justify-start items-center">
          {vehicleTypes?.map((v, i) => <Tag name={v} key={i} />)}
        </div>
      </main>


      <div className={`w-full min-h-50 bg-blue-400`}>

      </div>


    </div>
  )
}
export default SingleShop