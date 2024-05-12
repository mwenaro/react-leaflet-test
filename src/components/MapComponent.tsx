import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
interface MapProps {
  coordinates: [number, number][];
  color: string;
}

const MapComponent: React.FC<MapProps> = ({ coordinates, color }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={coordinates} color={color} />
    </MapContainer>
  );
};

export default MapComponent;
