import { useSelector } from "react-redux"
import defaultShopImg from "/default-shop-img.jpeg"
import { TbMotorbike } from "react-icons/tb";
import { useNavigate } from "react-router-dom"
const ShopCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme)
    const navigate = useNavigate();

    // console.log(data)


    //1 : toggle shop isActive
    const handleShopActiveToggle = async () => {

    }


    // status of shop
    function returnStatus(status) {
        switch (status) {
            case "verified": {
                return (<div className={`w-auto px-2 h-6 rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-green-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 rounded-full bg-green-500`}></span>
                </div>)
            }

            case "banned": {
                return (<div className={`w-auto px-2 h-6 rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-red-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 rounded-full bg-red-500`}></span>
                </div>)
            }

            case "rejected": {
                return (<div className={`w-auto px-2 h-6 rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-gray-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 rounded-full bg-gray-500`}></span>
                </div>)
            }

            default: {
                return (<div className={`w-auto px-2 h-6 rounded-full bg-white absolute top-2 left-2 text-xs flex justify-center gap-1 items-center font-semibold text-yellow-500`}>
                    {`${status}`.toUpperCase()}
                    <span className={`h-2 w-2 rounded-full bg-yellow-500`}></span>
                </div>)
            }
        }
    }


    return (
        <div className="w-full min-w-[280px] max-w-100 min-h-60  rounded-t-xl rounded-b-md flex justify-center relative active:scale-90 transition-all ease-in-out"
            style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.border}` }}
            onClick={() => navigate(`/owner/single-shop/${data._id}`)}
            name={data.location.address}
        >

            <div className="w-[95%] h-[90%] absolute -top-6 rounded-2xl">

                {returnStatus(data.status)}

                <img className="w-full h-full rounded-2xl object-cover"
                    src={defaultShopImg}

                ></img>

                {data.status !== "banned" && (<div className={`w-18 h-6 rounded-full bg-white absolute bottom-2 right-2 text-xs flex justify-center gap-1 items-center font-semibold ${data.isActive ? "text-green-300" : "text-red-500"}`}>
                    {data.isActive ? "OPEN" : "CLOSED"}
                    <span className={`h-3 w-3 rounded-full ${data.isActive ? "bg-green-600" : "bg-red-600"}`}></span>
                </div>)}
            </div>

            <div className="w-full h-12  flex items-center justify-between px-2 self-end">

                <span className="text-xs" style={{ color: currentTheme.secondary }}>{data?.name?.toUpperCase()}</span>

                <span className="flex w-auto h-5 items-center text-sm"><TbMotorbike className="h-full w-5" /> :10</span>

                <button className="text-xs w-20 h-8 rounded-md cursor-pointer active:scale-90 transition-all ease-in-out"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    style={{ backgroundColor: currentTheme.accent, color: "black" }}
                >{data.isActive ? "Close shop" : "Open Shop"}</button>

            </div>

        </div>
    )
}
export default ShopCard