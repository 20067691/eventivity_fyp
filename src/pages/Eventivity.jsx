import GoogleMapView from "../components/GoogleMap";

export default function Landing() {
  const handleEventSelect = (event) => {
    console.log("Selected event from Landing page:", event);
    // Later: setSelectedEvent(event), navigate("/signin"), etc.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F4] p-6">
      <h1 className="text-3xl font-bold text-[#552834] mb-4">Welcome to Eventivity</h1>
      <p className="text-gray-600 mb-6">Click on an event marker to begin.</p>
      <GoogleMapView onEventSelect={handleEventSelect} />
    </div>
  );
}
