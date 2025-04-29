// Eventivity.jsx
// This component serves as the landing page for the Eventivity application.
import { text } from "framer-motion/client";
import GoogleMapView from "../components/GoogleMap";
import useTheme from "../hooks/useTheme";
import { useEvent } from "../context/EventContext";
import { useEffect } from "react";
import EventList from "../components/EventList";

export default function Landing() {
  const { background, accent, text } = useTheme();
  const { resetToDefaultEvent } = useEvent();

  useEffect(() => {
    resetToDefaultEvent();
  }, []);

  const handleEventSelect = (event) => {
    console.log("Selected event from Landing page:", event);
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F4] p-6">
      <h1 className="text-3xl font-bold mb-4" style={{ color: text }}>Welcome to Eventivity</h1>
      <p className="text-gray-600 mb-6">Click on an event marker to begin.</p>
      <GoogleMapView onEventSelect={handleEventSelect} />
      <EventList />
    </div>
  );
}
