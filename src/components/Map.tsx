import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [center, setCenter] = useState<[number, number]>([
    -4.043477, 39.668205,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc: any) => {
      const {
        coords: { latitude, longitude },
      } = loc;
      
      console.log({latitude, longitude})
      setCenter([latitude, longitude]);
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: "98vw", height: "98vh", margin: "10px auto" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
