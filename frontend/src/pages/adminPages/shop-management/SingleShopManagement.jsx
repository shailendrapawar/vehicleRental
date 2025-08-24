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

  const fetchSingleShop = async () => {
    try {

      const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/shop/get-single-shop/${shopId}`, {
        withCredentials: true
      })
      console.log(res.data.data)
      setShop(res.data.data)

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  const returnStatus = (status = "Unknown", position) => {
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

  useEffect(() => {
    fetchSingleShop()
  }, [shopId]);

  if (!shopId) return

  return (
    <div className="min-h-[calc(100vh-100px)] h-auto w-full">

      <section className="w-full flex h-10 items-center relative mb-2">
        <button className="w-15 h-8 text-xs rounded-md absolute left-0 rounded-l-full"
          onClick={() => navigate(-1)}
          style={{ backgroundColor: currentTheme.accent }}
        >Back</button>
        {/* <h3>Update vehicle status</h3> */}
      </section>

      <main className="w-full h-auto py-2 px-2  rounded-md grid grid-cols-1 sm:grid-cols-2"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >
        <section className="h-60 bg-red-400 rounded-md relative overflow-clip">
          <img className="h-full w-full bg-amber-500 rounded-md"></img>
        </section>

        <section className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="h-auto  flex flex-col text-xs gap-1 font-mono">
            <h3 className="text-lg" style={{ color: currentTheme.accent }}> Basis: 1</h3>
            <span className="" ><b style={{ color: currentTheme.textSecondary }}>Name: </b>{shop?.name}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>Contact:</b> {shop?.phoneNumber}</span>
            <span className="flex"><b style={{ color: currentTheme.textSecondary }}>ID:</b> {shop?._id}</span>
          </div>

          <div className="h-auto flex flex-col text-xs gap-1 font-mono">
            <h3 className="text-lg" style={{ color: currentTheme.accent }}>Ownership: 2</h3>
            <span><b style={{ color: currentTheme.textSecondary }}>OWNER: </b>{shop?.owner?.name}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>EMAIL: </b>{shop?.owner?.email}</span>
            <span><b style={{ color: currentTheme.textSecondary }}>GST: </b>{shop?.gst?.number?.toUpperCase()}</span>
          </div>

          <span className=" flex h-8 items-center gap-2 font-mono"><b style={{color:currentTheme?.accent}}>Current Status:</b> { returnStatus(shop?.status)} </span>
        </section>

      </main>


    </div>
  )
}
export default SingleShopManagement