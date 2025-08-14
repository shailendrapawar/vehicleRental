import { useRef, useState } from "react"
import InputBox from "../../components/inputBox/InputBox"
import { useSelector } from "react-redux"
import addImgLogo from "../../assets/add-img.jpg"
import { indianStates } from "../../utils/states"
import MyMap from "../../components/myMap/MyMap"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const CreateShop = () => {

  const { currentTheme } = useSelector(s => s.theme)

  const navigate=useNavigate();

  const [isLoading, setIsLoading] = useState(false)
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
  }



  // #===create shop account ==========
  const handleCreateShop = async () => {

    if (isLoading) return

    try {
      if (shopData.name == "") { toast.error("Name cannot be empty"); return; }
      if (shopData.mobileNumber === "") { toast.error("Mobile number cannot be empty"); return; }
      if (shopData.gstNumber === "") { toast.error("GST number cannot be empty"); return; }
      if (shopData.gstImg == null || shopData.gstImg === "") { toast.error("Please select GST bill image"); return; }

      if (shopData.address === "" ||
        shopData.state === "" ||
        shopData.city === "" ||
        shopData.pinCode === "" ||
        shopData.latitude === "" ||
        shopData.longitude === ""
      ) { toast.error("Incomplete or Invalid address"); return; }

      // console.log("complete data",shopData)
      const shopForm = new FormData();

      shopForm.append("name", shopData.name);
      shopForm.append("phoneNumber", shopData.mobileNumber);
      shopForm.append("gstNumber", shopData.gstNumber);
      shopForm.append("gstBill", shopData.gstImg);


      shopForm.append("address", shopData.address)
      shopForm.append("state", shopData.state);
      shopForm.append("city", shopData.city);
      shopForm.append("pinCode", shopData.pinCode);
      shopForm.append("lat", shopData.latitude);
      shopForm.append("lng", shopData.longitude);


      setIsLoading(true);
      const res =await  axios.post(import.meta.env.VITE_API_URL + "/owner/create-shop", shopForm, {
        withCredentials: true
      })

      toast.success(`${res.data.msg} 😍`)

      setTimeout(() => {
         navigate("/owner/my-shops")
      }, 2000);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.msg+"😓")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-[calc(100vh-80px)] h-auto w-full flex flex-col gap-5 py-5 ">
      {/* ====basic details=========== */}
      <section className=" h-120 sm:h-80 w-full gap-2 flex flex-col sm:flex-row p-2 rounded-xl"
        style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.border}` }}

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
      <section className="h-140 sm:h-80  w-full  flex flex-col sm:flex-row px-2 py-2 rounded-xl gap-5"
        style={{ backgroundColor: currentTheme.cardBackground, border: `1px solid ${currentTheme.border}` }}
      >

        <main className="h-[50%] sm:h-full w-full bg-yellow-800  rounded-lg overflow-hidden">

          <MyMap size={"h-full w-full"} setShopData={setShopData} />

        </main>



        <aside className="h-[50%] sm:h-full w-full  grid grid-cols-2 gap-2 py-2">
          <h3 className="text-xl col-span-2"
            style={{ color: currentTheme.accent }}
          >2: Location Details</h3>

          <section className="min-h-10 h-auto pt-5 pb-1 px-2 w-full bg-black col-span-2 rounded-md text-xs flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          >
            <span className="">{shopData?.address}</span>

            <span className="absolute top-1 left-2 text-[10px] font-sans"
              style={{ color: currentTheme.accent }}
            >Address :</span>
          </section>


          <section className="h-10 w-full bg-black col-span-2 rounded-md text-sm flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          >{shopData?.state}

            <span className="absolute top-1 left-2 text-[10px] font-sans"
              style={{ color: currentTheme.accent }}
            >State :</span>
          </section>


          <section className="h-10 w-full bg-black col-span- rounded-md text-xs flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          ><span className="absolute top-1 left-2 text-[10px] font-sans"
            style={{ color: currentTheme.accent }}
          >City :</span>

            {shopData?.city}
          </section>


          <section className="h-10 w-full bg-black col-span- rounded-md text-sm flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          ><span className="absolute top-1 left-2 text-[10px] font-sans"
            style={{ color: currentTheme.accent }}
          >Code :</span>

            {shopData?.pinCode}
          </section>

          <section className="h-10 w-full bg-black col-span- rounded-md text-sm flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          ><span className="absolute top-1 left-2 text-[10px] font-sans"
            style={{ color: currentTheme.accent }}
          >lat :</span>

            {Number.parseFloat(shopData?.latitude).toFixed(4)}
          </section>

          <section className="h-10 w-full bg-black col-span- rounded-md text-sm flex justify-center items-center relative"
            style={{ backgroundColor: currentTheme.background }}
          ><span className="absolute top-1 left-2 text-[10px] font-sans"
            style={{ color: currentTheme.accent }}
          >lon :</span>

            {Number.parseFloat(shopData?.longitude).toFixed(4)}
          </section>

        </aside>

      </section>

      {!isLoading && (
        <button
          className="h-10 w-30 sm:w-40 rounded-xl self-center cursor-pointer active:scale-90 transition-all ease-in-out"
          style={{ backgroundColor: currentTheme.primary, }}
          onClick={(e) => {
            handleCreateShop(e)
          }}
        >Create Shop</button>
      )}



    </div>
  )
}
export default CreateShop