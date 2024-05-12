import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const defaultCoordinates: [number, number] = [-4.04374, 39.658871];

export const MapComponent4 = () => {
  const [routeCoordinates, setRouteCoordinates] = useState<
    [number, number][] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const townACoordinates = { lat: -4.0435, lon: 39.6682 }; // Mombasa, Kenya
  const townFCoordinates = { lat: 0.4244, lon: 33.2041 }; // Jinja, Uganda

  useEffect(() => {
    const fetchData = async () => {
      try {
        const route = await fetchRoute(townACoordinates, townFCoordinates);
        setRouteCoordinates(route);
        setError(null);
      } catch (error) {
        setError("Failed to fetch route. Please try again.");
      }
    };

    fetchData();
  }, []);

  const fetchRoute = async (startCoordinates: any, endCoordinates: any) => {
    const response = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${startCoordinates.lon},${startCoordinates.lat};${endCoordinates.lon},${endCoordinates.lat}?overview=full&geometries=geojson`
    );
    let result: any[] = [];
    // Extract the route coordinates from the response
    const route = response.data.routes[0]?.geometry?.coordinates || [];

    response.data.waypoints.forEach((way: any) => {
      result.push(way.location? way.location.reverse(): way.location);
    });
    console.log({result})
    if (result.length) return result;
    if (Array.isArray(route) && route.length) return route;
    return [];
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {routeCoordinates !== null && (
        <MapContainer
          center={defaultCoordinates}
          zoom={6}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Polyline for the route */}
          <Polyline positions={routeCoordinates} color="red" />

          {/* Marker for point A (Mombasa) */}
          <Marker position={[townACoordinates.lat, townACoordinates.lon]}>
            {/* Optional Popup for the marker */}
            <Popup>
              <div>Mombasa, Kenya</div>
            </Popup>
          </Marker>

          {/* Marker for point F (Jinja) */}
          <Marker position={[townFCoordinates.lat, townFCoordinates.lon]}>
            {/* Optional Popup for the marker */}
            <Popup>
              <div>Jinja, Uganda</div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};
