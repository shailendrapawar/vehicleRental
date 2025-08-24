import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

import { formatDate } from "../../../utils/dateHandler";

import toast, {} from "react-hot-toast"


const SingleVehicle = () => {

    const { vehicleId } = useParams();
    const { currentTheme } = useSelector(s => s.theme)

    const navigate=useNavigate();

    const [vehicle, setVehicle] = useState({});

    const [vehicleStatus, setVehicleStatus] = useState("");
    const [statusMessage, setStatusMessage] = useState("")

    const [photos, setPhotos] = useState([]);
    const [index, setindex] = useState(0);

    const[refresher,toggleRefresher]=useState(true)



    const fetchVehicleDetail = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + `/admin/vehicle/get-vehicle/${vehicleId}`, {
                withCredentials: true
            })
            // console.log(res)
            setVehicle(res.data.data.vehicle)
            setPhotos(res.data.data.vehicle.images)
            setVehicleStatus(res.data.data.vehicle.status)

        } catch (error) {
            console.log(error)
        }
    }

    const handleStatusUpdate = async () => {

        if (vehicleStatus === vehicle?.status || statusMessage === "") {
            return
        }
        try {

            const res = await axios.put(import.meta.env.VITE_API_URL + `/admin/vehicle/update-vehicle/${vehicleId}`, {
                status: vehicleStatus,
                statusMessage
            }, {
                withCredentials: true
            })

            setStatusMessage("");
            toggleRefresher(prev=>!prev)
            toast.success("Vehicle status updated")
            
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    const handlePhotoChange = (action) => {
        // console.log(action)
        switch (action) {
            case "prev":
                if (index > 0) {
                    setindex(prev => prev - 1)
                }

                break;

            case "next":
                if (index < photos.length - 1) {
                    setindex(prev => prev + 1)
                }
                break;
            default:
                break;
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
        fetchVehicleDetail()
    }, [vehicleId,refresher])


    if (!vehicleId) {
        return
    }

    return (
        <div className="min-h-[calc(100vh-100px)] h-auto w-full">
            <section className="w-full flex h-10 items-center relative mb-2">
                <button className="w-15 h-8 text-xs rounded-md absolute left-5"
                onClick={()=>navigate(-1)}
                    style={{ backgroundColor: currentTheme.accent }}
                >Back</button>
                {/* <h3>Update vehicle status</h3> */}
            </section>


            <main className="w-full h-auto py-2 px-2 grid grid-cols-2 rounded-md"
                style={{ backgroundColor: currentTheme.cardBackground }}
            >
                <section className="h-60 w-full col-span-2 sm:col-span-1 relative bg-black flex justify-center items-center rounded-lg">
                    <img className="h-full w-full object-contain "
                        src={photos[index]?.url || null}
                    ></img>

                    {returnStatus(vehicle?.status, "absolute top-2 right-2")}

                    <button className="h-8 w-8 rounded-full absolute bottom-2 left-2 active:scale-95 transition-all ease-in-out cursor-pointer"
                        style={{ backgroundColor: currentTheme.accent }}
                        onClick={(e) => handlePhotoChange("prev")}
                    ><GrFormPrevious className="h-full w-full" /></button>

                    <span className="h-6 w-15 absolute bottom-2 rounded-full flex items-center justify-evenly text-sm"
                        style={{ backgroundColor: currentTheme.secondary }}
                    >
                        <b>{index + 1}</b>
                        of
                        <b>{photos.length}</b>
                    </span>

                    <button className="h-8 w-8 rounded-full absolute bottom-2 right-2 active:scale-90 transition-all ease-in-out cursor-pointer"
                        style={{ backgroundColor: currentTheme.accent }}
                        onClick={(e) => handlePhotoChange("next")}
                    ><MdOutlineNavigateNext className="h-full w-full" /></button>
                </section>


                <section className="h-auto w-full col-span-2  sm:col-span-1 relative  grid grid-cols-2 p-2">
                    <div className=" h-auto col-span-1">
                        <h3 className="text-sm" style={{ color: currentTheme.accent }} >Basic details</h3>

                        <section className="w-full h-auto flex flex-col items-start justify-start gap-2 text-[10px] pl-1 mt-2 font-mono">
                            <span><b style={{ color: currentTheme.textSecondary }} >BRAND:</b> {vehicle?.brand}</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >MODEL:</b> {vehicle?.model}</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >FUEL:</b>  {vehicle?.fuelType}</span>

                            <span><b style={{ color: currentTheme.textSecondary }} >TRANS:</b>  {vehicle?.transmission}</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >MILEAGE:</b>  {vehicle?.mileage} km/l</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >SEATER:</b>  {vehicle?.seatingCapacity}</span>
                        </section>
                    </div>

                    <div className=" h-full col-span-1">
                        <h3 className=" text-sm" style={{ color: currentTheme.accent }}>Ownership </h3>

                        <section className="w-full h-auto flex flex-col items-start justify-start gap-2 text-[10px] pl-1 mt-2 font-mono">
                            <span><b style={{ color: currentTheme.textSecondary }} >REGNO: </b>  {vehicle?.registrationNumber}</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >SHOP: </b>  {vehicle?.shopId?.name}</span>
                            <span><b style={{ color: currentTheme.textSecondary }} >OWNER:</b>  {vehicle?.owner?.name}</span>
                            <img className="h-15 w-15 bg-black rounded-lg"
                                src={vehicle?.owner?.profilePicture?.url}
                            ></img>
                        </section>
                    </div>


                    <span className="col-span-2 h-10 flex items-center gap-2">
                        <h3 className="h-6 flex items-center text-sm" style={{ color: currentTheme?.accent }}>Current Status</h3>:
                        <select className="w-20 text-xs py-1 px-2 rounded-md outline-none cursor-pointer"
                            style={{ backgroundColor: currentTheme.primary }}
                            value={vehicleStatus}
                            onChange={(e) => setVehicleStatus(e.target.value)}
                        >
                            <option value={"approved"}>Approved</option>
                            <option value={"rejected"}>Rejected</option>
                            <option value={"banned"}>Banned</option>
                        </select>
                    </span>

                </section>

            </main>


            {vehicle?.status !== vehicleStatus && (<aside className="h-auto py-4 px-2 mt-5 flex items-center gap-2 rounded-md"
                style={{ backgroundColor: currentTheme.cardBackground }}
            >
                <input className="h-8 w-full text-xs px-2 outline-none"
                    style={{ borderBottom: `3px solid ${currentTheme.border}` }}
                    placeholder="Enter status message"
                    value={statusMessage}
                    onChange={(e)=>setStatusMessage(e.target.value)}
                />

                <button className="w-20 sm:w-25 h-8 self-end rounded-md active:scale-90 transition-all ease-in-out"
                    style={{ backgroundColor: currentTheme.accent }}
                    onClick={handleStatusUpdate}
                >Update</button>
            </aside>)}

            <section className="w-full h-auto min-h-20 mt-2 rounded-md px-4 py-2 " >
                <h3 className=" flex items-center gap-2" style={{ color: currentTheme.secondary }}
                >History <FaHistory /></h3>

                <div className="w-full  h-auto  min-h-10">

                    {vehicle?.history?.map((v, i) => {
                        return <span
                            key={i}
                            className="px-1 text-xs py-3 flex justify-start items-center gap-2 font-mono"
                            style={{ borderBottom: `2px solid ${currentTheme.border}` }}
                        >
                            {i + 1}: ({formatDate(v.timestamps)}) {returnStatus(v?.action, "relative max-w-15")} <span>-{v.message}</span>
                        </span>
                    })}

                </div>

            </section>


        </div>
    )
}
export default SingleVehicle