import { useCalendar } from "../context/CalendarContext";

export default function EventCard({ event, onSelect }) {
  const { addEvent } = useCalendar();

  const handleAddToCalendar = (e) => {
    e.stopPropagation(); // Prevent card click from also navigating
    addEvent(event);
  };

  return (
    <div
      onClick={() => onSelect(event)}
      className="cursor-pointer bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl transition"
    >
      <h2 className="text-2xl font-bold mb-2 text-[#9c40ff]">{event.name}</h2>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-600 text-sm">{event.startDate} to {event.endDate}</p>

      <button
        onClick={handleAddToCalendar}
        className="mt-3 text-sm text-white bg-[#9c40ff] px-3 py-1 rounded hover:bg-[#7c30cc]"
      >
        Add to Calendar
      </button>
    </div>
  );
}
