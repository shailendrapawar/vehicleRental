import Header from "../../../components/header/Header"
import { FaShop } from "react-icons/fa6"; 
import { FaCar } from "react-icons/fa";
import ShopCard from "../../../components/shopCard/ShopCard";
const Shops = () => {
  const handleAddShop = () => {
    // Logic to add a new shop
  }

  const shop=[1,2,3]
  
  return (
    <div
      className=" h-full w-full rounded-md relative"
    >
      <Header title="Shop Management" action={handleAddShop} actionIcon={<FaShop />} actionTitle="Add Shop" />

      <section className={"bg-yellow-300 h-[20%] w-full mt-5 rounded-md flex items-center justify-center"}>
        kpi's
      </section>

      <section className={" hide-scrollbar  max-h-[60%]  mt-5 rounded-md flex flex-wrap justify-center overflow-y-scroll gap-4"}>
        {shop.map((s,i)=>{
          return <ShopCard/>
        })}
      </section>
   
    </div>
  )
}
export default Shops