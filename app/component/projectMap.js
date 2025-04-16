import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is included

// Custom hook to update map center
const CenterMap = ({ coordinates }) => {
  const map = useMap();  // Access the map instance
  if (coordinates) {
    map.setView(coordinates, 14);  // Set new center and zoom level
  }
  return null;
};

const ProjectMap = ({ projects, selectedProject }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[20.5937, 78.9629]}  // Default center (India's central coordinates)
        zoom={5}                      // Default zoom level
        style={{ height: '100%', width: '100%' }}  // Set fixed height for the map
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Update map center when a project is selected */}
        {selectedProject && <CenterMap coordinates={[selectedProject.coordinates.latitude, selectedProject.coordinates.longitude]} />}

        {projects.map((project, index) => (
          project.coordinates.latitude && project.coordinates.longitude && (
            <Marker
              key={index}
              position={[project.coordinates.latitude, project.coordinates.longitude]}
              icon={new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',  // Custom marker icon URL
                iconSize: [25, 41],  // Size of the marker icon
              })}
            >
              <Popup>
                <strong>{project.name}</strong><br />
                {project.priceRange}<br />
                {project.builder}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}

export default ProjectMap
