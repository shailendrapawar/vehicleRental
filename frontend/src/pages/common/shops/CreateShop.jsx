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

            <div className="col-span-2  h-8 rounded-md text-sm flex justify-center items-center cursor-pointer"
              style={{
                // backgroundColor: currentTheme.secondary,
                border: `2px solid ${currentTheme.secondary}`
              }}
              title="Click to upload GST bill"
              onClick={(e) => gstInputRef?.current?.click()}
            >
              Upload GST bill image
            </div>

            <textarea className="resize-none col-span-2 row-span-2 p-1 text-xs outline-none rounded-md"
              placeholder="Add some thoughts for your shop."
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




      <section className={"w-full h-120 md:h-70 p-2 mt-5 rounded-md grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5"}
        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >
        <main className="bg-red-500 row-span-1 rounded-md">

        </main>

        <aside className="gap-2 relative flex flex-col items-center"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          <h3 className="text-right w-full pr-2 mt-2"
            style={{
              color: currentTheme.textPrimary
            }}

          > 3: Location Details</h3>

          <section className="w-full h-auto  grid grid-cols-2 grid-rows-3  row-span-1  gap-5 mt-5">
            <span className="h-10 bg-white col-span-2 relative rounded-md flex  items-center text-xs"
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}
              >Address</h3>

              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">some smaple address</span>
            </span>

            <span className="h-10 bg-white col-span-1 relative rounded-md text-xs flex items-center"
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}
              >District</h3>

              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">some sample District</span>
            </span>

            <span className="h-10 bg-white col-span-1 relative rounded-md text-xs flex items-center"
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}>City</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">some sample District</span>

            </span>

            <span className="h-10 bg-white col-span-1 relative rounded-md flex items-center text-xs"
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}>Pincode</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">some smaple address</span>
            </span>

            <span className="h-10 bg-white col-span-1 relative rounded-md flex items-center text-xs"
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1 "
                style={{
                  backgroundColor: "inherit"
                }}>Lat , Long</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">some smaple address</span>

            </span>
          </section>

        </aside>

      </section>
    </div>
  )
}
export default CreateShop