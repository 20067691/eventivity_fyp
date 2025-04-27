// src/components/EventNavBar.jsx
import { Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import useTheme from '../hooks/useTheme'; // Importing the custom hook for theme

export default function EventNavBar() {
    const { selectedEvent } = useEvent(); // Access the selected event from context
    const { background, text } = useTheme();
  return (
    <header className="shadow-md py-4 px-6" style={{ backgroundColor: background }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold" style={{ color: text }}>
            {selectedEvent.name || 'Eventivity'}
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/app/home" className="hover:underline" style={{ color: text }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/app/schedule" className="hover:underline" style={{ color: text }}>
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/app/forum" className="hover:underline" style={{ color: text }}>
                Forum
              </Link>
            </li>
              <li>
              <Link to="/app/workshops" className="hover:underline" style={{ color: text }}>
                Workshops
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
// This component serves as the navigation bar for the Eventivity application, specifically for the event page.
// It includes links to the Home, Schedule, and Forum pages, allowing users to navigate through the application easily.