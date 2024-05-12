import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

const defaultCoordinates: [number, number] = [-4.043740, 39.658871];

export const MapComponent3 = () => {
  const townACoordinates = { lat: -4.0435, lon: 39.6682 }; // Mombasa, Kenya
  const townFCoordinates = { lat: 0.4244, lon: 33.2041 }; // Jinja, Uganda

  const routeCoordinates:[number, number][] = [
    [townACoordinates.lat, townACoordinates.lon],
    [townFCoordinates.lat, townFCoordinates.lon],
  ];

  return (
    <MapContainer center={defaultCoordinates} zoom={12} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Polyline for the route */}
      <Polyline positions={routeCoordinates} color="blue" />

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
  );
};
