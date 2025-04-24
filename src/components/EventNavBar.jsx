// src/components/EventNavBar.jsx
import { Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';

export default function EventNavBar() {
    const { selectedEvent } = useEvent(); // Access the selected event from context
  return (
    <header className="bg-[#F7F4F4] shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold" style={{ color: selectedEvent?.themeColor || '#552834' }}>
            {selectedEvent.name || 'Eventivity'}
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/app/home" className="text-[#552834] hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/app/schedule" className="text-[#552834] hover:underline">
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/app/forum" className="text-[#552834] hover:underline">
                Forum
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