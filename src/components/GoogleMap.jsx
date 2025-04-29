// src/components/GoogleMapView.jsx
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext"; 
import eventData from "../data/eventData";

const mapCenter = { lat: 52.258661144842975, lng: -7.111564759586401 }; 
const zoomLevel = 13;


export default function GoogleMapView({ onEventSelect }) {
    const navigate = useNavigate();
    const { setSelectedEvent } = useEvent();
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map center={mapCenter} zoom={zoomLevel} style={{ width: "50%", height: "500px" }}>
        {eventData.map((event) => (
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
