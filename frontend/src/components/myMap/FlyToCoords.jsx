import { useEffect, useRef } from "react"
import { useMap } from "react-leaflet"
const FlyToCoords = ({ position }) => {
  const map = useMap();
   const lastPosition = useRef();
  useEffect(() => {
    const { lat, lng } = position;
    if (
      lat != null &&
      lng != null &&
      (!lastPosition.current ||
        lastPosition.current.lat !== lat ||
        lastPosition.current.lng !== lng)
    ) {
      map.setView([lat, lng], map.getZoom());
      lastPosition.current = { lat, lng };
    }
  }, [position, map]);
  return null
}
export default FlyToCoords