import eventData from "../data/eventData";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";

export default function EventList() {
    const { setSelectedEvent } = useEvent();
    const navigate = useNavigate();

    const handleSelect = (event) => {
        setSelectedEvent(event);
        navigate("/app/home");
    };

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {eventData.map((event) => (
                <div
                    key={event.id}
                    onClick={() => handleSelect(event)}
                    className="cursor-pointer bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl transition"
                >
                    <h2 className="text-2xl font-bold mb-2 text-[#9c40ff]">
                        {event.name}
                    </h2>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-600 text-sm">
                        {event.startDate} to {event.endDate}
                    </p>
                </div>
            ))}
        </div>
    );
}
