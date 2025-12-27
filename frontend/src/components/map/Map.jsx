
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents, ZoomControl } from "react-leaflet"
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import "./map.css"
const Map = ({ height = "100%", width = "100%" }) => {
    const position = [28.6139, 77.2090];
    return (
        //    <div className="h-[100%] w-[100%] absolute">
        <MapContainer
            className={"relative"}
            center={position}
            zoom={13}
            style={{ height, width }}
            // zoomControl:false
            // ZoomControl:false
            attributionControl:false
        >

            <TileLayer
                // attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >

            </TileLayer>

            <MapEvents onCenterChange={(center)=>{
                console.log(center)
            }} />
            <div className="center-pin">📍</div>

        </MapContainer>
        //    </div>
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

}