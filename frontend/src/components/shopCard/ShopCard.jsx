import { useSelector } from "react-redux"
import defaultShopImg from "/default-shop-img.jpeg"
import { TbMotorbike } from "react-icons/tb";
const ShopCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme)
    console.log(data)

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
        <div className="w-full min-w-[300px] max-w-100 min-h-60 bg-gray-400 rounded-md flex justify-center relative"
            style={{ backgroundColor: currentTheme.cardBackground }}
        >

            <div className="w-[95%] h-[90%] bg-red-900 absolute -top-6 rounded-2xl">

                {returnStatus(data.status)}

                <img className="w-full h-full rounded-2xl object-cover"
                    src={defaultShopImg}
                ></img>

                {data.status !== "banned" && (<div className={`w-18 h-6 rounded-full bg-white absolute bottom-2 right-2 text-xs flex justify-center gap-1 items-center font-semibold ${data.isActive ? "text-green-300" : "text-red-500"}`}>
                    {data.isActive ? "OPEN" : "CLOSED"}
                    <span className={`h-3 w-3 rounded-full ${data.isActive ? "bg-green-600" : "bg-red-600"}`}></span>
                </div>)}
            </div>

            <div className="w-full h-12  flex items-center justify-around self-end">

                <span className="text-xs">{data.location.address}, {data.location.city}</span>

                <span className="flex w-auto h-6 items-center"><TbMotorbike className="h-full w-6" /> :10</span>

                <button className="text-xs w-25 h-8 rounded-3xl"
                    style={{ backgroundColor: currentTheme.accent, color: "black" }}
                >Togggle shop</button>

            </div>

        </div>
    )
}
export default ShopCard