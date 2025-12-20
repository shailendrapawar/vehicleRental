import { FaShop } from "react-icons/fa6";

import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import InputBox from "../../../components/inputBox/InputBox";
function CreateShop() {

  const { currentTheme } = useSelector(s => s.theme);

  const handleCreateShop = async () => {

  }
  return (
    <div className=" h-full w-full rounded-md relative">
      <Header title="Shop Management" action={handleCreateShop} actionTitle="Submit" />

      <section className={"w-full h-120  mt-5 rounded-md bg-gray-500 grid grid-cols-1 grid-rows-2 gap-4"}

        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid 5px ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >

        <div className="bg-red- flex flex-col justify-evenly px-2 bg-green-500"

        >
          <h3>Basic Details:</h3>
          <div className="grid grid-cols-2 grid-rows-3 gap-2">
            <InputBox size={"h-8 text-sm"}
              placeholder={"Enter Shop name"}
              border={`2px solid ${currentTheme.border}`}
            />
            <InputBox size={"h-8 text-sm"}
              placeholder={"Enter GST Number"}
              border={`2px solid ${currentTheme.border}`}
            />
            <textarea className="resize-none col-span-2 row-span-2 p-1 text-xs outline-none rounded-md"
              placeholder="Enter some description for your shop."
              style={{
                border: `2px solid ${currentTheme.border}`
              }}
            ></textarea>
          </div>

          <h3 >Listing type:</h3>
          <aside className="h-6 flex gap-4 text-sm">
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Scooty</span>
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Bike</span>
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Car</span>
          </aside>

        </div>

        <div className="bg-red-500">

        </div>

      </section>






      <section className={"w-full h-auto p-2 mt-5 rounded-md bg-gray-500"}
        style={{

        }}
      >
      </section>


    </div>
  )
}
export default CreateShop