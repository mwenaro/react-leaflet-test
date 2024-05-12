export async function fetchRoute() {
  try {
    const mombasaCoords = [39.66359, -4.0435]; // Coordinates for Mombasa
    const nairobiCoords = [36.8219, -1.2921]; // Coordinates for Nairobi
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${mombasaCoords[1]},${mombasaCoords[0]};${nairobiCoords[1]},${nairobiCoords[0]}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }

    const data = await response.json();
    console.log(data); // Log the data to check the response
    return data.routes[0].geometry.coordinates; // Array of coordinates representing the route
  } catch (error) {
    console.error('Error fetching route:', error);
    return null; // Return null or handle the error in a different way based on your needs
  }
}
