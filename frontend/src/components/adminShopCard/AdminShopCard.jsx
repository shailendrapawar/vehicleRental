import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoCopy } from "react-icons/io5";

import defaultShopImg from "/default-shop-img.jpeg"

const AdminShopCard = ({ data }) => {

    const { currentTheme } = useSelector(s => s.theme)

    const navigate = useNavigate();

    const returnStatus = (status = "Unknown") => {
        let colorStyle = "";

        switch (status) {
            case "pending": {
                colorStyle = "bg-yellow-400 text-gray-800"
                break
            }
            case "approved" || "verified": {
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
            <div className={`h-6 w-auto px-2 ${colorStyle} text-xs flex justify-center items-center rounded-full`}
            >
                {status}
            </div>
        )

    }

    return (
        <div className="h-20 w-full max-w-150 flex items-center justify-between px-2 relative"
            style={{ borderBottom: `1px solid ${currentTheme.border}` }}
            onClick={() => navigate(`/admin/manage-shops/${data?._id}`)}
        >
            <img className="h-16 w-18 bg-amber-300 rounded-md object-cover "
                src={defaultShopImg}
            ></img>

            <span style={{ color: currentTheme.textSecondary }} className=" py-1 text-[8px] font-mono absolute top-1 right-1 flex gap-1 active:opacity-50 transition-all ease-in-out"
                onClick={(e) => {
                    e.stopPropagation();

                }}
            >id:{data?._id} <IoCopy /></span>

            <span className="text-xs"><b className="text-xs" style={{ color: currentTheme.textSecondary }}>SHOP: </b>{data?.name}</span>

            <span className="text-xs hidden sm:block"><b className="text-xs" style={{ color: currentTheme.textSecondary }}>OWNER: </b> {data?.owner?.name}</span>

            {returnStatus(data?.status)}

        </div>
    )
}
export default AdminShopCard