import { FaShop } from "react-icons/fa6";

import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import InputBox from "../../../components/inputBox/InputBox";
import { useRef, useState } from "react";

import Map from "../../../components/map/Map";
import SearchBar from "../../../components/searchBar/SearchBar";

import FileUploader from "../../../components/fileUploader/FileUploader";

function CreateShop() {

  const { currentTheme } = useSelector(s => s.theme);
  const gstInputRef = useRef(null);

  const [loading, setLoading] = useState(false)
  const [listingItems, setListingItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    gstNumber: "",
    listingTypes: [],
    description: "",

    //location details
    address: "",
    // district: "",
    state: "",
    city: "",
    pinCode: "",
    lat: "",
    lon: "",
  })

  const [shopImages, setShopImages] = useState([])

  const checkPayload = async () => {

  }

  const handleFormChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const setMapLocationData = async (data) => {
    // console.log("state uplifted", data)
    setFormData((prev) => ({
      ...prev,
      address: data.formattedAddress,
      // district:data.district,
      state: data?.state,
      city: data?.city,
      pinCode: data?.pinCode,
      lat: data?.lat,
      lon: data?.lon
    }))
  }

  const handleCreateShop = async (e) => {

    e.preventDefault();
    // if()

  }



  return (

    <form className=" h-full w-full rounded-md relative"
      onChange={(e) => handleFormChange(e)}
      onSubmit={(e) => handleCreateShop(e)}
    >

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

              name={"name"}
            />
            <InputBox size={"h-8 text-sm"}
              placeholder={"Enter GST Number"}
              border={`2px solid ${currentTheme.border}`}

              name={"gstNumber"}
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
              name={"description"}
            ></textarea>
          </div>

          <h3 > 2: Listing types</h3>
          <aside className="h-8 flex gap-4 text-sm">
            {Array.from(['Scooty', "Bike", "Car"]).map((item, i) => {
              return <span
                key={i}
                className=" min-w-15 flex items-center justify-center px-3 font-semibold  rounded-full cursor-pointer select-none"
                style={{
                  backgroundColor: listingItems.includes(item) ? currentTheme.secondary : currentTheme.background,
                  border: `2px solid ${currentTheme.secondary}`,
                  color: listingItems.includes(item) ? "white" : currentTheme.secondary
                }}
                title={item}
                onClick={() => {
                  if (listingItems.includes(item)) {
                    setListingItems(s => s.filter((i) => i != item))
                  } else {
                    setListingItems(s => [...s, item])
                  }
                }}
              >{item}</span>

            })}

          </aside>

        </div>

        {/* // updaloding SHOP photos  */}
        <div className="rounded-md flex justify-center items-center">
          <FileUploader
            files={shopImages}
            setFiles={setShopImages}
            multiple={true}
            size={5}
            acceptType={"image"}
          />

        </div>
      </section>




      <section className={"w-full h-130 md:h-70 p-2 mt-5 rounded-md grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-2 md:gap-5"}
        style={{
          backgroundColor: currentTheme.cardBackground,
          border: `1px solid ${currentTheme.border}`,
          boxShadow: `2px 2px 5px ${currentTheme.border}`
        }}
      >
        <main className=" row-span-1 rounded-md">
          <Map setMapLocationData={setMapLocationData} setLoading={setLoading} loading={loading} />
        </main>

        <aside className="gap-2 relative flex flex-col items-center justify-evenly"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          <h3 className="text-right w-full pr-2 mt-2"
            style={{
              color: currentTheme.textPrimary
            }}

          > 3: Location Details</h3>

          {/* {!loading && (<BubbleLoader size={4} color="blue-500"/>)} */}

          <section className="w-full h-auto  grid grid-cols-2 grid-rows-3  row-span-1  gap-5 relative ">

            <span className={` ${loading ? "skeleton " : ""}h-10 bg-white col-span-2 relative rounded-md flex  items-center text-xs`}
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}
              >Address</h3>

              <span className={`px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap`}>{formData.address || ""}</span>
            </span>

            <span className={`  ${loading ? "skeleton" : ""} h-10 bg-white col-span-1 relative rounded-md text-xs flex items-center`}
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}
              >State</h3>

              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">{formData?.state || ""}</span>
            </span>

            <span className={` ${loading ? "skeleton" : ""} h-10 bg-white col-span-1 relative rounded-md text-xs flex items-center`}
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}>City</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">{formData?.city || ""}</span>

            </span>

            <span className={` ${loading ? "skeleton" : ""} h-10 bg-white col-span-1 relative rounded-md flex items-center text-xs`}
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1"
                style={{
                  backgroundColor: "inherit"
                }}>Pincode</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">{formData?.pinCode || ""}</span>
            </span>

            <span className={` ${loading ? "skeleton" : ""} h-10 bg-white col-span-1 relative rounded-md flex items-center text-xs`}
              style={{
                border: `2px solid ${currentTheme.border}`,
              }}
            >
              <h3 className="text-[10px] absolute -top-2 left-2 px-1 "
                style={{
                  backgroundColor: "inherit"
                }}>Lat , Lon</h3>
              <span className="px-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">{Number(formData?.lat)?.toFixed(2)} <b>,</b> {Number(formData?.lng ?? formData?.lon)?.toFixed(2)}</span>

            </span>
          </section>

        </aside>

      </section>
    </form>
  )
}
export default CreateShop