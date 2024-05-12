import  { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { fetchRoute } from './fetchRoute';
interface MapProps {
  startCoordinates: [number, number];
  endCoordinates: [number, number];
  routeCoordinates: [number, number][];
  color: string;
}

const MapComponent2: React.FC<MapProps> = ({ startCoordinates, endCoordinates, routeCoordinates, color }) => {
//   const MapComponent2 =()=>{
console.log(endCoordinates, routeCoordinates,color, "-------------------------- not counted")
    const [routeCoordinates2, setRouteCoordinates] = useState<[number, number][] | null>(null);

    useEffect(() => {
      async function fetchRouteCoordinates() {
        const route = await fetchRoute();
        setRouteCoordinates(route);
      }
      fetchRouteCoordinates();
    }, [routeCoordinates]);

    if(!routeCoordinates2) return <h3>/map loadind !</h3>
  return (
    <MapContainer center={startCoordinates} zoom={7} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={routeCoordinates2 as any} color={color} />
    </MapContainer>
  );
};

export default MapComponent2;
