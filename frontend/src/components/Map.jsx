import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "../assets/images/gps.png";

const Map = ({ lat, lng, uniName, uniLoc }) => {
  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <div className="rounded-xl">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[400px] rounded-xl z-10"
        style={{ borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={[lat, lng]}>
          <Popup>
            {uniName} <br /> {uniLoc}.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
