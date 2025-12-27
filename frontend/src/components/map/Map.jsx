
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents, ZoomControl } from "react-leaflet"
import { useEffect, useState } from "react";
import "./map.css"
import { useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
import GeoLocationService from "../../services/geoLocation.service";
const Map = ({ height = "100%", width = "100%", setMapLocationData, setLoading, loading }) => {

    const { currentTheme } = useSelector(s => s.theme)

    const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 })
    const [query, setQuery] = useState("");
    const [queryResult, setQueryResult] = useState([]);

    const reverseGeoCode = async (coords) => {
        try {
            console.log("reverse",position)
            console.log("coords",coords)
            setLoading(true)
            
            const result = await GeoLocationService.reverseLocate({ ...coords })
            if (result.isSuccess) {
                setMapLocationData(result.data)
            }

        } catch (error) {
            // console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const searchAutoSuggestion = async () => {
        try {
            setLoading(true)
            const result = await GeoLocationService.autoComplete({ query })

            if (result?.data && result?.data?.length) {
                setQueryResult(result?.data)
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    // for scroll and get addres(reverse geocoding)
    useEffect(() => {
        if (!position) return
        if (position && position.lat && position.lng) {
            reverseGeoCode({ lat: position?.lat, lon: position?.lng })
        }
    }, [position])

    //for auto suggestion
    useEffect(() => {
        if (query.trim() == "") {
            setQueryResult([])
            return
        }
        let t1 = setTimeout(async () => {
            if (query?.trim()?.length) {
                searchAutoSuggestion()
            }
        }, 1000);

        return () => clearTimeout(t1)
    }, [query])

    console.log("rendered")
    return (
        <div className="h-[100%] w-[100%] flex flex-col justify-between "
            style={{
                // heig
            }}
        >
            <section className={`h-[15%] flex justify-center relative ${loading ? "skeleton" : ""}`}>
                <SearchBar
                    placeholder={"Enter some location"}
                    query={query}
                    setQuery={setQuery}
                />

                {(!loading && query.length > 0 && queryResult.length > 0) && (
                    <ul className="h-auto p-2 w-full rounded-md absolute top-10 z-999 flex flex-col gap-2"
                        style={{
                            backgroundColor: currentTheme.background,
                            border: ` 1px solid ${currentTheme.border}`
                        }}
                    >

                        {queryResult?.map((v, i) => {
                            return <li key={i}
                                className=" cursor-pointer h-auto max-h-5 overflow-clip break-keep text-ellipsis text-xs"
                                onClick={() => {
                                    console.log("clicked", v)
                                    setMapLocationData(v)
                                    // setQuery("")
                                    setPosition({ lat: v.lat, lng: v.lon })
                                    setQueryResult([])
                                }}
                            >{v.formattedAddress}</li>
                        })}

                    </ul>
                )}
            </section>

            <section className="h-[80%]">
                <MapContainer
                    className={"relative rounded-md"}
                    center={position}
                    zoom={13}
                    style={{ height, width }}
                    zoomControl={false}
                >
                    <TileLayer
                        // attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    >

                    </TileLayer>

                    <MapEvents onCenterChange={(center) => {
                        console.log(center)
                        setPosition(center)
                    }} />

                    <FlyToLocation position={position}/>
                    <div className="center-pin">📍</div>

                </MapContainer>
            </section>
        </div>
    )
}
export default Map


function MapEvents({ onCenterChange }) {
    useMapEvents({
        moveend: (e) => {
            const center = e.target.getCenter();
            onCenterChange(center);
        }
    });
    return null
}

function FlyToLocation({ position }) {

    const map = useMap();
    useEffect(() => {
        if (!position) return;
        if (!map.getCenter().equals(position)) {
            map.setView(position, map.getZoom(), {
                animate: true,
            });
        }
    }, [position]);

    return null;

}