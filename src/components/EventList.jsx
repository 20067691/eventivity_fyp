import eventData from "../data/eventData";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../context/EventContext";
import { useCalendar } from "../context/CalendarContext";
import EventCard from "./EventCard";

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
            <EventCard key={event.id} event={event} onSelect={handleSelect} />
          ))}
        </div>
      );
    }
