import { useState } from "react"
import { useSelector } from "react-redux";
import { MapContainer, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import CenterLocator from "./CenterLocator";
import { useEffect } from "react";
import {toast}from "react-hot-toast"
import axios from "axios"

const MyMap = ({ size }) => {
    const { currentTheme } = useSelector(s => s.theme)

    const [position, setPosition] = useState({
        lat: 28.6139,
        lng: 77.2090
    })


    const [query, setQuery] = useState("");
    const [suggestions, setSuggestion] = useState([])
    const[isSearching,setIsSearching]=useState(false);

    const[location,setLocation]=useState(null);

    const handleSuggestionClick=async(data)=>{
        console.log(data)
        setQuery(data?.properties?.formatted)
        setSuggestion([])
        setIsSearching(false)

    }

    const fetchLocationWithCoords=async()=>{
        try {
            const res=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
            console.log(res)
            
        } catch (error) {
            console.log(error)
            toast.error("error in fetch location") 
        }
    }

    const fetchSuggestions=async()=>{

        try {

            
            const res=await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=3&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
            console.log(res.data.features)
            setSuggestion(res.data.features)
            
        } catch (error) {
            console.log(error)
            toast.error("error in fetch location") 
        }
    }

    //only when coords changes
    useEffect(() => {
        console.log("position changed", position)
        fetchLocationWithCoords()
        // set final location 
    }, [position])


    //  search for location ========
    useEffect(()=>{
        if(query.trim()){
            fetchSuggestions()
            // fetchLocation
        }
    },[query])

    return (
        <div className={`${size} relative z-0 flex flex-col justify-center items-center`}>

            <input type="text"
                className="h-[15%] w-full text-center text-sm outline-none"
                style={{ backgroundColor: currentTheme.background }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="query"
                placeholder="Search for any place..."
            />
            {
                query!=="" && (<ul className="bg-black w-full text-center text-xs absolute z-5 top-[15%]">
                {suggestions?.map((v, i) => {
                    return (<li key={i}
                    className="h-6 flex justify-center items-center"
                    onClick={(e)=>handleSuggestionClick(v)}
                    >{v?.properties?.formatted}</li>)
                })}
            </ul>)
            }

            <MapContainer className="h-[85%] w-full z-0 select-none"
                center={[position.lat, position.lng]}
                zoom={15}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                <CenterLocator setPosition={setPosition} />
            </MapContainer>

            <span
                className=" drop-shadow-md drop-shadow-black text-3xl rounded-full absolute z-10 select-none">
                📍
            </span>

        </div>
    )
}
export default MyMap