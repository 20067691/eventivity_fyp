// src/components/GoogleMapView.jsx
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext"; 

const mapCenter = { lat: 52.258661144842975, lng: -7.111564759586401 }; // Example: Dublin 52.258661144842975, -7.111564759586401 52.26219222200546, -7.114898093801613
const zoomLevel = 14;

const events = [
  {
    id: "Seanchaí2026",
    name: "Seanchaí 2026",
    position: { lat: 52.258661144842975, lng: -7.111564759586401 }
  },
  {
    id: "EcoExpo",
    name: "Eco Expo",
    position: { lat: 52.26219222200546, lng: -7.114898093801613 }
  }
];

export default function GoogleMapView({ onEventSelect }) {
    const navigate = useNavigate();
    const { setSelectedEvent } = useEvent();
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map center={mapCenter} zoom={zoomLevel} style={{ width: "100%", height: "500px" }}>
        {events.map((event) => (
          <Marker
            key={event.id}
            position={event.position}
            title={event.name}
            onClick={() => {
                setSelectedEvent(event);
                navigate("/app/home");
                console.log("Event selected:", event.id);
              
            }}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
