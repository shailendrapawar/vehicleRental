import Header from "../../../components/header/Header"
import { FaShop } from "react-icons/fa6";
import ShopCard from "../../../components/shopCard/ShopCard";
import { useEffect, useState } from "react";
import NoResourceImg from "/resource-not-found.svg"
import KpiCard from "../../../components/kpi/KpiCard";
import{useNavigate} from "react-router"

import ShopService from "../../../services/shop.service"
const Shops = () => {

  const navigate=useNavigate()

  const [shops, setShops] = useState([])

  const handleAddShop = () => {
    // Logic to add a new shop
  }

  const fetchShops = async() => {
    try {
      const result=await ShopService.search()
      // console.log(result)
      if(Array.isArray(result.data)){
        setShops(result.data);
      }
      
    } catch (error) {
      
    }
  }
  // console.log(shops.items)

  useEffect(()=>{
    fetchShops();
  },[])

  return (
    <div
      className=" h-full w-full rounded-md relative"
    >
      <Header title="Shop Management" action={()=>navigate("/owner/shops/add")} actionIcon={<FaShop />} actionTitle="Add Shop" />

      <section className={" h-[20%] w-full mt-5 rounded-md items-center justify-center grid grid-cols-3 gap-4"}>
        <KpiCard size={"h-full "} />
        <KpiCard size={"h-full "} />
        <KpiCard size={"h-full "} />
      </section>

      <section className={" hide-scrollbar  max-h-[60%]  mt-5 rounded-md flex flex-wrap justify-center overflow-y-scroll gap-4"}>
        {shops.length == 0 ? (<div>
          <img src={NoResourceImg} className="h-50 w-50"></img>
          <h3>{"No shop has been added yet"}</h3>
        </div>)
          :
          (<>{shops.map((v, i) => {
            return <ShopCard data={v} key={i} />
          })}</>)}
      </section>

    </div>
  )
}
export default Shops