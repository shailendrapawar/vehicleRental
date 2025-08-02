import { useRef, useState } from "react"
import InputBox from "../../components/inputBox/InputBox"
import { useSelector } from "react-redux"
import addImgLogo from "../../assets/add-img.jpg"
import { indianStates } from "../../utils/states"
import MyMap from "../../components/myMap/MyMap"
const CreateShop = () => {

  const { currentTheme } = useSelector(s => s.theme)

  const [shopData, setShopData] = useState({
    name: "",
    mobileNumber: "",
    gstNumber: "",
    gstImg: "",

    address: "",
    city: "",
    state: "",
    pinCode: "",
    longitude: "",
    latitude: "",
  })

  // const[gstFile,setGstFile]=useState("");
  const [objectUrl, setObjecturl] = useState(null);

  const gstImgInputRef = useRef();


  const handleChange = async (e) => {

    console.log("changed called")
    const { name, value, type } = e.target

    // for file input set separate value and object url
    if (type === "file") {
      const file = e.target.files[0];
      const objectUrl = await URL.createObjectURL(file)
      setObjecturl(objectUrl)
      setShopData(prev => ({
        ...prev,
        gstImg: file

      }))
      return
    }


    setShopData(prev => ({
      ...prev,
      [name]: value

    }))
    // console.log("shop-data",shopData)
  }


  console.log(shopData)


  return (
    <div className="min-h-[calc(100vh-80px)] h-auto w-full flex flex-col gap-5 py-5 ">



      {/* ====basic details=========== */}
      <section className=" h-120 sm:h-80 w-full gap-2 flex flex-col sm:flex-row p-2 rounded-xl"
        style={{ backgroundColor: currentTheme.cardBackground, border:`1px solid ${currentTheme.border}` }}

      >
        <main className="w-full h-[50%] sm:h-full  flex flex-col justify-evenly  "
        >
          <h3 className="text-xl"
            style={{ color: currentTheme.accent }}
          >1: Basic Details</h3>
          <InputBox size={`h-10 w-full`}
            value={shopData.name}
            onChange={handleChange}
            type={"text"} name={"name"}
            placeholder={"Enter name of shop"}
            required={true}
            maxLength={50}
          />

          <InputBox size={`h-10 w-full`}
            value={shopData.mobileNumber}
            onChange={handleChange}
            type={"text"} name={"mobileNumber"}
            placeholder={"Enter mobile number"}
            required={true}
            maxLength={10}
          />

          <InputBox size={`h-10 w-full`}
            value={shopData.gstNumber}
            onChange={handleChange}
            type={"text"} name={"gstNumber"}
            placeholder={"Enter GST number"}
            maxLength={15}
            required={true}
          />
        </main>


        <aside className="w-full h-[50%] sm:h-full  rounded-xl overflow-hidden relative flex justify-center items-center"
          style={{ backgroundColor: currentTheme.cardBackground }}
        >
          <input className="hidden"
            onChange={(e) => handleChange(e)}
            maxLength={1}

            type={"file"} name={"gstImg"} ref={gstImgInputRef}></input>

          <img src={objectUrl || addImgLogo} className="h-full w-full bg-black hover:blur-xs object-contain"></img>

          <h3 className="absolute text-black h-8 w-auto px-2 bg-white rounded-full flex justify-center items-center active:scale-95 transition-all ease-in-out"
            onClick={() => gstImgInputRef?.current.click()}
            style={{ backgroundColor: currentTheme.accent }}
          >Upload GST Bill</h3>
        </aside>
      </section>


      {/* =========location details============== */}
      <section className="h-140 sm:h-80  w-full  flex flex-col-reverse sm:flex-row px-2 py-2 rounded-xl gap-5"
        style={{ backgroundColor: currentTheme.cardBackground,border:`1px solid ${currentTheme.border}`  }}
      >

        <main className="h-[50%] sm:h-full w-full bg-yellow-800  rounded-lg overflow-hidden">

          <MyMap size={"h-full w-full"}/>

        </main>

        <aside className="h-[50%] sm:h-full w-full  grid grid-cols-2 gap-2 py-2">
          <h3 className="text-xl col-span-2"
            style={{ color: currentTheme.accent }}
          >2: Location Details</h3>

          <InputBox size={`h-10 w-full col-span-2`}
            value={shopData.address}
            onChange={handleChange}
            type={"text"} name={"address"}
            placeholder={"your shop address"}
            maxLength={100}
            required={true}
          />

          <select className="col-span-2 h-10 rounded-md outline-none text-xs"
            style={{ backgroundColor: currentTheme.accent, color: "black" }}
            onChange={(e) => handleChange(e)}
            name="state"
            value={shopData?.state}
          >

            <option value="" className="bg-green-200 text-center">Select Your State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}
                className=" text-center bg-green-200"
              >
                {state}
              </option>
            ))}
          </select>


          <InputBox size={`h-10 w-full`}
            value={shopData.city}
            onChange={handleChange}
            type={"text"} name={"city"}
            placeholder={"your city"}
            maxLength={100}
            required={true}
          />
          <InputBox size={`h-10 w-full`}
            value={shopData.pinCode}
            onChange={handleChange}
            type={"text"} name={"pinCode"}
            placeholder={"your pincode"}
            maxLength={6}
            required={true}
          />

          <InputBox size={`h-10 w-full`}
            value={shopData.latitude}
            onChange={handleChange}
            type={"text"} name={"latitude"}
            placeholder={"your latitude"}
            required={true} />
          <InputBox size={`h-10 w-full`}
            value={shopData.longitude}
            onChange={handleChange}
            type={"text"} name={"longitude"}
            placeholder={"your longitude"}
            required={true} />

        </aside>

      </section>

      <button
        className="h-10 w-30 sm:w-40 rounded-xl self-center cursor-pointer active:scale-90 transition-all ease-in-out"
        style={{ backgroundColor: currentTheme.primary, }}
      >Create Shop</button>



    </div>
  )
}
export default CreateShop