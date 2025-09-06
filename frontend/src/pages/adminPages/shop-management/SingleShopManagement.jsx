import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { IoCopy } from "react-icons/io5";

const SingleShopManagement = () => {

  const navigate = useNavigate();

  const { currentTheme } = useSelector(s => s.theme)
  const { shopId } = useParams()

  const [shop, setShop] = useState({});

  const [shopStatus, setShopStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("")

  const [refresh,toggleRefresh]=useState(false);

  
  const fetchSingleShop = async () => {
    try {

      const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/shop/get-shops/${shopId}`, {
        withCredentials: true
      })
      console.log(res.data.data)
      setShop(res.data.data)
      setShopStatus(res.data.data.status);

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
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
      <div className={`h-6 w-auto px-5 ${position} ${colorStyle} text-xs flex justify-center items-center rounded-full`}
      >
        {status}
      </div>
    )

  }

  const  handleStatusUpdate=async()=>{
    try {

      const res=await axios.put(import.meta.env.VITE_API_URL+`/admin/shop/update-shop-status/${shopId}`,{
        status:shopStatus,
        statusMessage
      },{withCredentials:true})

      toggleRefresh(prev=>!prev);
      toast.success(` Shop status changed to ${shopStatus}`)
      setStatusMessage("")
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchSingleShop()
  }, [shopId,refresh]);

  if (!shopId) return

  return (
    <div className="min-h-[calc(100vh-100px)] h-auto w-full ">

      <section className="w-full flex h-10 items-center relative mb-2">
        <button className="w-15 h-8 text-xs rounded-md absolute left-0 rounded-l-full cursor-pointer"
          onClick={() => navigate(-1)}
          style={{ backgroundColor: currentTheme.accent }}
        >Back</button>
        {/* <h3>Update vehicle status</h3> */}
      </section>

      <main className="w-full h-auto py-2 px-2  rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 sm:gap-4"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >
        <section className="h-60 sm:h-80 bg-red-400 rounded-md relative overflow-clip">
          <img className="h-full w-full bg-amber-500 rounded-md"></img>
        </section>


        <section className="py-4 grid grid-cols-1  md:grid-cols-2 sm:grid-cols-2 sm:py-0 gap-2 md:px-2">
          <div className="h-auto gap-2 sm:gap-0  flex flex-col justify-evenly text-xs px-2 font-mono sm:px-2 sm:col-span-2 md:col-span-2 lg:text-lg">
            <h3 className="text-lg" style={{ color: currentTheme.accent }}> Basis:</h3>
            <span className=" " ><b style={{ color: currentTheme.textSecondary }}>Name: </b>{shop?.name}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>Contact:</b> {shop?.phoneNumber}</span>
            <span className="inline"><b style={{ color: currentTheme.textSecondary }}>ID:</b> {shop?._id}</span>
          </div>

          <div className="h-auto flex flex-col justify-evenly text-xs gap-2 sm:gap-0 px-2 font-mono sm:px-2 sm:col-span-2 md:col-span-2 lg:text-lg">
            <h3 className="text-lg" style={{ color: currentTheme.accent }}>Ownership:</h3>
            <span><b style={{ color: currentTheme.textSecondary }}>OWNER: </b>{shop?.owner?.name}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>EMAIL: </b>{shop?.owner?.email}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>GST: </b>{shop?.gst?.number?.toUpperCase()}</span>
          </div>

          <span className=" flex w-full h-8 items-center gap-2 font-mono sm:px-2 sm:col-span-2 mx-2 sm:mx-0 lg:text-lg"><b className="font-mono font-light" style={{ color: currentTheme?.accent }}>Change Status:</b>
            <select className="w-20 text-xs py-1 px-2 rounded-md outline-none cursor-pointer"
              style={{ backgroundColor: currentTheme.primary }}
              value={shopStatus}
              onChange={(e) => setShopStatus(e.target.value)}
            >
              <option value={"pending"}>Pending</option>
              <option value={"approved"}>Approved</option>
              <option value={"rejected"}>Rejected</option>
              <option value={"banned"}>Banned</option>
            </select></span>
        </section>
      </main>



      {shop?.status !== shopStatus && (<aside className="h-auto py-4 px-2 mt-5 flex items-center gap-2 rounded-md"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >
        <input className="h-8 w-full text-xs px-2 outline-none"
          style={{ borderBottom: `3px solid ${currentTheme.border}` }}
          placeholder="Enter status message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />

        <button className="w-20 sm:w-25 h-8 self-end rounded-md active:scale-90 transition-all ease-in-out"
          style={{ backgroundColor: currentTheme.accent }}
        onClick={handleStatusUpdate}
        >Update</button>
      </aside>)}


      


    </div>
  )
}
export default SingleShopManagement