import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const Map = ({ lat, lng, uniName, uniLoc }) => {
  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
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
