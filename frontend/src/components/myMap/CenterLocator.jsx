import { useEffect } from "react"
import { useMap, } from "react-leaflet"
const CenterLocator = ({setPosition}) => {
  const map = useMap();
    useEffect(() => {

        const handleMove = () => {
            const center = map.getCenter();
            setPosition({
                lat:center.lat,
                lng:center.lng
            })
        }

        map.on('moveend', handleMove); // or 'move' for continuous
        return () => {
            map.off('moveend', handleMove);
        };

    }, [])

    return null
}
export default CenterLocator