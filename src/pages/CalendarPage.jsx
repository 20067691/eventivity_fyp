import { useCalendar } from "../context/CalendarContext";
import DeleteButton from "../components/DeleteButton";


export default function CalendarPage() {
    const { savedEvents, removeEvent } = useCalendar();


    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-[#9c40ff]">My Calendar</h1>
            {savedEvents.length === 0 ? (
                <p className="text-gray-500">You haven't added any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {savedEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-2 text-[#9c40ff]">{event.name}</h2>
                            <p className="text-gray-700">{event.location}</p>
                            <p className="text-sm text-gray-500 mt-1">
                             {event.startDate} to {event.endDate}
                            </p>

                            <DeleteButton
                                onClick={() => {
                                    removeEvent(event.id); // Logic to remove the event from savedEvents
                                    console.log("Delete event:", event.id);
                                }}
                            />


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
