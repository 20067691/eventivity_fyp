import useTheme from "../hooks/useTheme";

export default function Schedule() {
  const { background, text } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6" style={{ backgroundColor: background }}>
      <h1 className="text-4xl font-bold mb-6" style={{color: text}}>Event Schedule</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        Here you will find the schedule of upcoming talks, workshops, and events!
      </p>
    </div>
  );
}
// This component serves as a placeholder for the Event Schedule page.
// In a real application, you would likely fetch and display event data here.