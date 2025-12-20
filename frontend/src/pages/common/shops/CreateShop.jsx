import { FaShop } from "react-icons/fa6";

import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import InputBox from "../../../components/inputBox/InputBox";
import { useRef } from "react";

import { MdAddPhotoAlternate } from "react-icons/md";

function CreateShop() {

  const { currentTheme } = useSelector(s => s.theme);
  const gstInputRef = useRef(null);
  const shopPhotosInputRef = useRef(null);

  const handleCreateShop = async () => {

  }

  return (

    <div className=" h-full w-full rounded-md relative">

      <Header title="Shop Management" action={handleCreateShop} actionTitle="Submit" />

      <section className={"w-full h-120 p-2 sm:h-60  mt-5 rounded-md bg-gray-500 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-4"}
        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >

        {/* // basic detils  */}
        <div className="flex flex-col justify-evenly px-2 "
        >
          <h3> 1: Basic Details</h3>
          <div className="grid grid-cols-2 grid-rows-3 gap-2">
            <InputBox size={"h-8 text-sm"}
              placeholder={"Enter Shop name"}
              border={`2px solid ${currentTheme.border}`}
            />
            <InputBox size={"h-8 text-sm"}
              placeholder={"Enter GST Number"}
              border={`2px solid ${currentTheme.border}`}
            />

            <input type="file" className="gstBill-input h-6 col-span-2  text-xs hidden"
              ref={gstInputRef}
            ></input>

            <div className="col-span-2 text-white h-8 rounded-md text-sm flex justify-center items-center cursor-pointer"
              style={{
                backgroundColor: currentTheme.secondary
              }}
              title="Upload GST bill"
              onClick={(e) => gstInputRef?.current?.click()}
            >
              Select GST bill image
            </div>

            <textarea className="resize-none col-span-2 row-span-2 p-1 text-xs outline-none rounded-md"
              placeholder="Enter some description for your shop."
              style={{
                border: `2px solid ${currentTheme.border}`
              }}
            ></textarea>
          </div>

          <h3 > 2: Listing types</h3>
          <aside className="h-6 flex gap-4 text-sm">
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Scooty</span>
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Bike</span>
            <span className="bg-amber-500 min-w-15 flex items-center justify-center px-3 rounded-full">Car</span>
          </aside>

        </div>

        {/* // updaloding SHOP photos  */}
        <div className="rounded-md flex justify-center items-center"
          style={{
            border: `2px solid ${currentTheme.secondary}`
          }}
        >
          <input type="file" className="gstBill-input h-6 col-span-2  text-xs hidden"
            ref={shopPhotosInputRef}
          ></input>

          <span className="flex flex-col items-center justify-center cursor-pointer"
            onClick={(e) => shopPhotosInputRef?.current?.click()}
          >
            <MdAddPhotoAlternate className="h-15 w-15" style={{ color: currentTheme.secondary }} />
            <h3 style={{ color: currentTheme.textSecondary }}>Add Shop Images</h3>
          </span>
        </div>
      </section>




      <section className={"w-full h-120 md:h-70 p-2 mt-5 rounded-md bg-gray-500 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5"}
        style={{
        }}
      >
        <div className="bg-red-500 row-span-1">

        </div>

        <div className="bg-yellow-500 grid grid-cols-2 gap-2">
          <h3>3: Location Details</h3>
          <span className="h-10 bg-white col-span-2 relative ">
            <h3 className="text-xs">Address</h3>
          </span>

          <span className="h-10 bg-white col-span-1 relative">
            <h3 className="text-xs">District</h3>

          </span>

          <span className="h-10 bg-white col-span-1 relative">
            <h3 className="text-xs">City</h3>

          </span>

          <span className="h-10 bg-white col-span-1 relative">
            <h3 className="text-xs">Pincode</h3>

          </span>

          <span className="h-10 bg-white col-span-1 relative">
            <h3 className="text-xs">Lat,Long</h3>

          </span>

        </div>

      </section>
    </div>
  )
}
export default CreateShop