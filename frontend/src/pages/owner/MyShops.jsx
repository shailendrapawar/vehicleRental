import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import InputBox from "../../components/inputBox/InputBox"
import ShopCard from "../../components/shopCard/ShopCard"
import { useNavigate } from "react-router-dom"

const MyShops = () => {

  const { user } = useSelector(s => s.auth)
  const { currentTheme } = useSelector(s => s.theme)

  const navigate=useNavigate();
  const [userShops, setUserShops] = useState([]);

  const [search, setSearch] = useState({
    query:"",
    result:[]
  });

  // console.log(user)


  //1: searching all vehicles
  const searchForUserShops = async () => {

    try {

      const res = await axios.get(import.meta.env.VITE_API_URL + `/owner/get-all-shops/${user._id}`, {
        withCredentials: true
      })
      // console.log(res.data.data)

      //set data to both states
      setUserShops(res.data.data)
      setSearch(prev=>({
        ...prev,
        result:[...res.data.data]
      }))

    } catch (error) {
      console.log("eeror in searching owners shop")
    }
  }

  // 2: handle change
  const  handleChange=async(e)=>{
    const {name,value}=e.target
    setSearch(prev=>({
      ...prev,
      [name]:value
    }))

    const filtereditems=userShops.filter((v)=>v.name.toLowerCase().includes(search.query.trim().toLowerCase()))

    setSearch(prev=>({
      ...prev,
      result:[...filtereditems]
    }))

  }

  useEffect(() => {
    searchForUserShops()
  }, [])

  return (
    <div className=" h-[calc(100vh-80px)] w-full flex flex-col items-center gap-5 py-5">


       <input
       className="min-h-8 w-full max-w-60 rounded-full text-sm text-center outline-none"
       type={"text"}
       placeholder={"Search for shops ..."}
       name={"query"}
       value={search.query}
       onChange={(e)=>handleChange(e)}
       style={{backgroundColor:currentTheme.cardBackground}}
       >
       </input>



      <button className="min-h-8 w-20 text-xs rounded-md active:scale-90 transition-all ease-in-out"
        style={{ backgroundColor: currentTheme.primary }}
        onClick={()=>navigate("/owner/create-shop")}
      >
        Create Shops
      </button>

      <section className=" w-full h-auto overflow-y-scroll flex flex-col items-center gap-10 py-10 ">

        {userShops?.length>0?(search?.result?.map((v,i)=>{
          return <ShopCard data={v} key={i}/>
        })):(
          <div className={`w-full`}>

            <h3 style={{color:currentTheme.textSecondary}}
            className="text-center"
            >No Shops added</h3>

          </div>
        )}

      </section>

    </div>
  )
}
export default MyShops