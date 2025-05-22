import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvent } from '../context/EventContext';
import useTheme from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import AvatarDropdown from './AvatarDropdown';

export default function EventNavBar() {
  const { user } = useAuth();
  const { selectedEvent } = useEvent();
  const { background, text } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-xl py-4 px-4" style={{ backgroundColor: background }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">

        {/* Logo */}
        <div className="flex w-full md:w-auto justify-between items-center">
          <Link
            to="/app/home"
            className="text-2xl font-bold"
            style={{ color: text }}
            onClick={() => setMenuOpen(false)} // 👈 Close menu when logo is clicked
          >
            {selectedEvent.name || 'Eventivity'}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
            style={{ color: text }}
          >
            ☰
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-center">
            <li>
              <Link
                to="/app/home"
                onClick={() => setMenuOpen(false)}
                className="block py-2 md:py-0 hover:underline"
                style={{ color: text }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/app/schedule"
                onClick={() => setMenuOpen(false)}
                className="block py-2 md:py-0 hover:underline"
                style={{ color: text }}
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/app/forum"
                onClick={() => setMenuOpen(false)}
                className="block py-2 md:py-0 hover:underline"
                style={{ color: text }}
              >
                Forum
              </Link>
            </li>
            <li>
              <Link
                to="/app/workshops"
                onClick={() => setMenuOpen(false)}
                className="block py-2 md:py-0 hover:underline"
                style={{ color: text }}
              >
                Workshops
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth section */}
        <div className={`w-full md:w-auto mt-4 md:mt-0 flex justify-center md:justify-end`}>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium" style={{ color: text }}>
                {user.username}
              </span>
              <AvatarDropdown />
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
                style={{ color: text }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="hover:underline"
                style={{ color: text }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
