import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
const useGetUserLocation = ({position,setPosition}) => {
    const getCurrentLocation = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported")
            return
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition({lat:latitude,lon:longitude,lng:longitude})
            console.log("user current", pos.coords)
            setIsAvailable(true)
        },
            (error) => {
                console.error("Location error:", err.message);
                toast.error("Error in getting location")
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    return null
}
export default useGetUserLocation