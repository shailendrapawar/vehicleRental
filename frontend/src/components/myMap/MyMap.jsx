import { useState } from "react"
import { useSelector } from "react-redux";
import { MapContainer, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import CenterLocator from "./CenterLocator";
import { useEffect } from "react";
import { toast } from "react-hot-toast"
import axios from "axios"
import FlyToCoords from "./FlyToCoords";

const MyMap = ({ size, setShopData }) => {
    const { currentTheme } = useSelector(s => s.theme)

    const [position, setPosition] = useState({
        lat: 28.6139,
        lng: 77.2090
    })

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestion] = useState([])
    const [isSelected, setIsSelected] = useState(false);

    // const [isSearching, setIsSearching] = useState(false);

    const [location, setLocation] = useState(null);

    const handleSuggestionClick = async (data) => {
        // console.log(data)
        setQuery(data?.properties?.formatted)

        setSuggestion([])

        setIsSelected(true);

        //now set new coords
        setPosition({
            lat: data?.properties.lat,
            lng: data?.properties.lon
        })

    }

    const fetchLocationWithCoords = async () => {

        try {
            const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
            console.log("final details set")
            setLocation(res?.data?.features[0]?.properties)

            if (query !== "") {
                setQuery(location?.formatted)
            }

            setIsSelected(true)

        } catch (error) {
            // console.log(error)
            toast.error("error in fetch with coords")
        }
    }


    const fetchSuggestions = async () => {
        try {
            const res = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=3&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
            // console.log(res.data.features)
            setSuggestion(res?.data?.features)

        } catch (error) {
            // console.log(error)
            toast.error("error in fetch location")
        }
    }

    //only when coords changes
    useEffect(() => {
        fetchLocationWithCoords()
        // set final location 
    }, [position])


    //  search for location ========
    useEffect(() => {
        if (query?.trim() && !isSelected) {

            //debounce suggestion
            const timer = setTimeout(() => {
                fetchSuggestions()
            }, 500);

            return () => clearTimeout(timer);
            // fetchLocation coords
        }

        if (isSelected) {
            setIsSelected(false)
        }
    }, [query])


    //set location when changed to parent
    useEffect(() => {
        // console.log("location",location)
        setShopData((prev => ({
            ...prev,

            address: `${location?.address_line1}, ${location?.address_line2}`,
            city:location?.city,
            state: location?.state,
            pinCode: location?.postcode,
            longitude:location?.lon,
            latitude:location?.lat,
        })))
    }, [location])

    return (
        <div className={`${size} relative z-0 flex flex-col justify-center items-center`}>

            <input type="text"
                className="h-[15%] w-full text-center text-xs px-2 outline-none"
                style={{ backgroundColor: currentTheme.background }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                name="query"
                autoComplete="off"
                placeholder="Search for any place..."
            />
            {
                query !== "" && (<ul className="bg-black w-full text-center text-xs absolute z-5 top-[15%]">
                    {suggestions?.map((v, i) => {
                        return (<li key={i}
                            className="h-6 flex justify-center items-center"
                            onClick={(e) => handleSuggestionClick(v)}
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
                <FlyToCoords position={position} />
            </MapContainer>

            <span
                className=" drop-shadow-md drop-shadow-black text-3xl rounded-full absolute z-10 select-none">
                📍
            </span>

        </div>
    )
}
export default MyMap