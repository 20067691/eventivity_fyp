// src/components/EventNavBar.jsx
import { Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import useTheme from '../hooks/useTheme'; // Importing the custom hook for theme
import { useAuth } from '../context/AuthContext';
import AvatarDropdown from './AvatarDropdown';

export default function EventNavBar() {
  const { user } = useAuth(); // Access the user from context
  const { selectedEvent } = useEvent(); // Access the selected event from context
  const { background, text } = useTheme();

  return (
    <header className="shadow-xl/20 py-6 px-4" style={{ backgroundColor: background }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">

        <div className="flex-1">
          <Link to="/app/home" className="text-2xl font-bold" style={{ color: text }}>
            {selectedEvent.name || 'Eventivity'}
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
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

        {/* User Authenticated */}
        <div className="flex-1 flex justify-end">
          {user ? (
            
            <AvatarDropdown />
          ) : (
            <div className="flex space-x-6">
              <Link to="/signin" className="text-[#552834] hover:underline">
                Sign In
              </Link>
              <Link to="/signup" className="text-[#552834] hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
// This component serves as the navigation bar for the Eventivity application, specifically for the event page.
// It includes links to the Home, Schedule, and Forum pages, allowing users to navigate through the application easily.