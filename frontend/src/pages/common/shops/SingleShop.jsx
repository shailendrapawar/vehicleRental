import { useSelector } from "react-redux";
import Header from "../../../components/header/Header"
import { FaCar } from "react-icons/fa";
import { useEffect, useState } from "react";
import VehicleCard from "../../../components/vehicleCard/VehicleCard";
import { useNavigate, useParams } from "react-router";
import ShopService from "../../../services/shop.service";
import VehicleService from "../../../services/vehicle.service";

import NoResourceImg from "/resource-not-found.svg"
const SingleShop = () => {
  const { currentTheme } = useSelector(s => s.theme)
  const navigate = useNavigate();

  const { id } = useParams()
  const [vehicles, setVehicles] = useState([])

  const [shop, setShop] = useState({});

  const fetchShopVehicles = async (id) => {

    try {
      const result = await VehicleService.search({ shop: id }, {})
      // console.log(result)
      if (result && result?.data?.length) {
        setVehicles(result?.data)
      }
    } catch (error) {

    }

  }

  const fetchShop = async (id) => {
    try {
      const result = await ShopService.get(id);
      // console.log(result?.data)
      if (result?.isSuccess && result?.data) {
        setShop(result?.data)
        fetchShopVehicles(id);
      }
    } catch (error) {
      navigate("/owner/shops/resource-not-found", {
        state: {
          title: "Shop not found",
          message: "the shop you requested for doesn't exists, or hasn't been listed yet",
          errorCode: 404,
          path: "/owner/shops",
          buttonTitle: "Go back"
        }
      })
    }

  }

  useEffect(() => {
    if (id) {
      fetchShop(id)
    }
  }, [])

  if (!id) return

  return (
    <div
      className=" h-full w-full rounded-md relative"
    >
      <Header title="Shop Management" action={() => { }} actionIcon={<FaCar />} actionTitle="Add Vehicle" />

      <section className="h-[30%] w-full  mt-5 rounded-md flex gap-5 relative">
        <div className="h-full w-[60%] rounded-md"
          style={{
            backgroundColor: currentTheme.cardBackground,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >

        </div>

        <div className="h-full w-[40%] rounded-md"
          style={{
            backgroundColor: currentTheme.cardBackground,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        >

        </div>
      </section>

      <section className="relative flex flex-col">

        <span className="mt-4 px-4 flex items-center justify-between">
          <h3 className="font-semibold text-xl w-[60%]">{shop?.name?.toUpperCase()}</h3>
          <span className="h-8 w-25 flex items-center justify-center rounded-full text-white"
            style={{ backgroundColor: currentTheme.secondary }}
          >Location</span>
        </span>

        <span className="w-full h-auto px-4 mt-2"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          description of shop
        </span>

        <span className="w-full px-4 py-4">
          tags
        </span>
      </section>

      <hr className="font-bold"></hr>

      <div className="h-10 w-full  mt-4 flex justify-center gap-5">
        <input className="h-10 w-[50%] max-w-100 bg-white rounded-md outline-none px-2"
          placeholder="Search in garage..."
          style={{
            backgroundColor: currentTheme.cardBackground,
            boxShadow: `2px 2px 5px ${currentTheme.border}`
          }}
        />
        <button className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer">f</button>
      </div>


      <main className="h-100 mt-4 w-full  flex gap-4 flex-wrap overflow-y-scroll hide-scrollbar justify-center items-center">
        {
          vehicles.length ==0 ? (<div className=" flex flex-col justify-center items-center">
            <img src={NoResourceImg} className="h-50 w-50"></img>
            <h3>{"No Vehicle have been added yet"}</h3>
          </div>)
          : 
          (vehicles?.map((v, i) => {
            return <VehicleCard data={v} key={i} />
          }))
        }
      </main>
    </div>
  )
}
export default SingleShop