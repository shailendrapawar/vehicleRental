import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import InputBox from "../../components/inputBox/InputBox";
import { toast } from "react-hot-toast"
import { vehicleColors } from "../../utils/vehicle";
import axios from "axios"

import uploadImageIcon from "/upload-image-icon.png"
import { TiDelete } from "react-icons/ti";
const AddVehicle = () => {

  const { shopId } = useParams();
  const navigate=useNavigate();
  // console.log(shopId)

  const { currentTheme } = useSelector(s => s.theme)
  const [steps, setSteps] = useState(1);
  const [photos, setPhotos] = useState([]);

  const imageRef = useRef();


  const [vehicleForm, setVehicleForm] = useState({
    registrationNumber: "",
    vehicleType: "",
    brand: "",
    model: "",
    year: "",
    color: "",

    fuelType: "",
    transmission: "",
    seatingCapacity: "",
    mileage: "",

    shopId: shopId || ""
  })

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setVehicleForm((prev) => ({
      ...prev,
      [name]: value
    }))

    // console.log(vehicleForm)
  }

  const handleFileChange = (e, action, index) => {
    const { files } = e.target;
    if (action === "add") {
      const imgFiles = Array.from(files)
      if (imgFiles.length < 1 || imgFiles.length > 3) {
        toast.error("Files shoud be 1 to 3 in number")
        // e.target.files=[]
        return
      }
      // console.log(imgFiles)
      setPhotos(imgFiles)
      return
    }
    if (action === "delete") {
      const temp = photos.filter((v, i) => i != index);
      setPhotos(temp)
      return
    }
  }


  const handleChangeSteps = async (value) => {
    switch (value) {
      case "next": {
        if (steps < 3) {
          setSteps(prev => prev + 1)
          break
        }
      }

      case "prev": {
        if (steps > 1) {
          setSteps(prev => prev - 1)
          break;
        }
      }
      default:
        break;
    }
  }


  // final submit for vehicle
  const handleVehicleSubmit = async () => {

    //1: basic details check
    for (let key in vehicleForm) {
      if (vehicleForm[key] === "") {
        console.log(`${key} is required`)
        toast.error(`${key} is required`)
        return;
      }
    }

    // 2: photos length check
    if (photos.length < 1 || photos.length > 3) {
      toast.error(`Invalid photos length (minimum 1 and max 3)`)
      return;
    }

    // 3: create a multipart form
    const vehicleData = new FormData();
    for (let key in vehicleForm) {
      if (vehicleForm[key] === "") {
        toast.error(`${key} is required`)
        return;
      }
      vehicleData.append(key, vehicleForm[key]);
    }

    // vehicleData.append("vehicleImages", photos)

    photos.forEach((file) => {
      vehicleData.append("vehicleImages", file);
    });

    // submitt form=============
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/owner/add-vehicle", vehicleData, {
        withCredentials: true
      })
      // console.log(res.data.msg)
      toast.success(res.data.msg);
      setTimeout(() => {
        navigate("/owner/my-vehicles")
      }, 1000);
    

    } catch (error) {
      console.log(error);
      toast.error(error.reponse.data.msg||"Somethin went wrong")
    }



  }

  // console.log(photos)
  return (
    <div className="h-[calc(100vh-80px)] w-full  flex justify-center items-center relative">

      <section className="w-full  bg-amber-400 relative  flex flex-col justify-center py-2 rounded-3xl"
        style={{ backgroundColor: currentTheme.cardBackground }}
      >

        <aside className="w-full flex justify-around items-center mt-2">
          <span className=" text-md  h-auto" style={{ color: currentTheme.accent }}>
            {"Enter details"}
          </span>

          <span className="text-sm"><b style={{ color: currentTheme.accent }}>{steps}</b> of 3</span>
        </aside>


        <section className=" w-auto px-5 h-auto  relative py-5">
          {/* render all sections here  */}

          {steps === 1 && (
            <main className="h-full w-full grid grid-cols-2 gap-2">

              <InputBox size={"h-12 w-full col-span-2 sm:col-span-1"}
                value={vehicleForm.registrationNumber}
                onChange={handleChange}
                name={"registrationNumber"}
                placeholder={"Enter registration number"}
                type={"text"}
                maxLength={10}
              />

              <select className="h-12 w-full col-span-2 sm:col-span-1 rounded-md text-xs px-1 outline-none"
                onChange={(e) => handleChange(e)}
                name={"vehicleType"}
                style={{ backgroundColor: currentTheme.background, color: currentTheme.textSecondary }}>
                <option value={""}>Select type, eg: bike, scooty, car</option>
                <option value={"scooty"}>Scooty </option>
                <option value={"bike"}>Bike</option>
                <option value={"car"}>Car</option>
              </select>

              <InputBox size={"h-12 w-full col-span-2 sm:col-span-1"}
                value={vehicleForm.brand}
                onChange={handleChange}
                name={"brand"}
                placeholder={"Enter brand name, eg: Honda"}
                type={"text"}
                maxLength={20}
              />

              <InputBox size={"h-12 w-full col-span-2 sm:col-span-1"}
                value={vehicleForm.model}
                onChange={handleChange}
                name={"model"}
                placeholder={"Enter model name, eg: Active"}
                type={"text"}
                maxLength={20}
              />

              <InputBox size={"h-12 w-full col-span-2 sm:col-span-1"}
                value={vehicleForm.year}
                onChange={handleChange}
                name={"year"}
                placeholder={"Enter model year, eg: 2020"}
                type={"text"}
                maxLength={4}
              />

              <div className="w-full min-h-10 h-auto col-span-2 sm:col-span-1 flex justify-evenly items-center flex-wrap gap-1 px-2">

                <span className=" mr-2" style={{ color: currentTheme.accent }}>Color: ( '{vehicleForm.color || "none"}' )</span>
                {vehicleColors.map((color, index) => (
                  <div
                    className="w-10 h-5 rounded-md"
                    key={index}
                    onClick={() => {
                      setVehicleForm((prev) => ({
                        ...prev,
                        color: color.name
                      }))
                    }}
                    style={{
                      backgroundColor: color.code,
                      border: vehicleForm.color === color.name ? "3px solid white" : "2px solid transparent",
                      cursor: "pointer",
                    }}
                    title={color.name}
                  ></div>
                ))}
              </div>
            </main>
          )}

          {
            steps === 2 && (
              <main className="h-full w-full grid grid-cols-2 gap-2">

                <select className="h-10 w-full col-span-2 sm:col-span-1 rounded-md text-center text-sm outline-none"
                  style={{ backgroundColor: currentTheme.background }}
                  onChange={(e) => handleChange(e)}
                  name="transmission"
                >
                  <option value={""}>Transmission</option>
                  <option value={"manual"}>Manual</option>
                  <option value={"automatic"}>Automatic</option>
                </select>


                <select className="h-10 w-full col-span-2 sm:col-span-1 rounded-md text-center text-sm outline-none"
                  style={{ backgroundColor: currentTheme.background }}
                  onChange={(e) => handleChange(e)}
                  name="fuelType"
                >
                  <option value={""}>Fuel Type</option>
                  <option value={"desiel"}>Desiel</option>
                  <option value={"petrol"}>Petrol</option>
                </select>


                <InputBox
                  size={"h-10 w-full col-span-2"}
                  placeholder={"Enter seating capacity"}
                  maxLength={1}
                  value={vehicleForm.seatingCapacity}
                  name={"seatingCapacity"}
                  onChange={handleChange}
                />

                <InputBox
                  size={"h-10 w-full col-span-2"}
                  placeholder={"Enter mileage"}
                  maxLength={3}
                  name={"mileage"}
                  onChange={handleChange}
                />

              </main>
            )
          }

          {
            steps === 3 && (
              <main className="h-50 w-full flex flex-col gap-1 justify-center">

                <div className="h-[50%] w-auto text-sm flex  flex-col justify-center items-center" style={{ color: currentTheme.textSecondary }}>
                  <h3>Upload following photos</h3>
                  <li>1 Registration </li>
                  <li>1 Isuarance </li>
                  <li>1 vehicle front or side photo</li>
                </div>

                <div className="flex h-[50%] w-full justify-center gap-2">
                  <section className="w-auto h-auto flex overflow-y-scroll gap-1">
                    {photos?.map((v, i) => {
                      const objectUrl = URL.createObjectURL(v);

                      return (
                        <div className="h-25 min-w-25 bg-amber-200 relative" key={i}>
                          <img src={objectUrl} className="w-full h-full"></img>
                          <span className="absolute right-1 top-1 text-black h-6 w-6"
                            onClick={(e) => handleFileChange(e, "delete", i)}
                          ><TiDelete className=" text-black w-full h-full" /></span>
                        </div>
                      )
                    })}
                  </section>

                  <input type="file" name="vehicleImage" onChange={(e) => handleFileChange(e, "add")} ref={imageRef} multiple maxLength={3} accept={"image/*"} className="w-15 hidden"></input>

                  <img src={uploadImageIcon} className="min-w-25 h-25 active:scale-95 transition-all ease-in-out" onClick={() => {
                    imageRef?.current?.click()
                  }}></img>
                </div>

              </main>
            )
          }
        </section>




        {/* ===========action buutton=============== */}
        <aside className="h-12 w-full   flex justify-between items-center relative ">
          {(steps > 1) && (<button className="w-20 h-8 rounded-md absolute left-5 cursor-pointer active:scale-95 transition-all ease-in-out"
            style={{ backgroundColor: currentTheme.primary }}
            onClick={() => handleChangeSteps("prev")}
          >Prev</button>)}

          {(steps < 3) && (<button className="w-20 h-8 rounded-md absolute right-5 cursor-pointer active:scale-95 transition-all ease-in-out"
            style={{ backgroundColor: currentTheme.primary }}
            onClick={() => handleChangeSteps("next")}
          >Next</button>)}

          {(steps === 3) && (<button className="w-20 h-8 rounded-md absolute right-5 cursor-pointer active:scale-95 transition-all ease-in-out"
            style={{ backgroundColor: currentTheme.accent }}
            onClick={(e) => { handleVehicleSubmit(e) }}
          >Submit</button>)}
        </aside>


      </section>
    </div>
  )
}
export default AddVehicle