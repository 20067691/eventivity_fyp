// src/components/LandingNavBar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AvatarDropdown from './AvatarDropdown';

export default function LandingNavBar() {
  const { user } = useAuth(); // Access the user from context

  return (
    <header className="bg-[#F7F4F4] shadow-xl/20 py-6 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">

        <div className="flax-1">
          <Link to="/" className="text-2xl font-bold text-[#9c40ff]">
            Eventivity
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-[#9c40ff]">{user.username}</span>
            <AvatarDropdown />
          </div>
        ) : (
        <nav>
          <div className="flex space-x-6">
            <Link to="/signin" className="text-[#9c40ff] hover:underline">
              Sign In
            </Link>
            <Link to="/signup" className="text-[#9c40ff] hover:underline">
              Sign Up
            </Link>
          </div>
        </nav>
          )}
      </div>
    </div>
    </header >
  );
}
// This component serves as the navigation bar for the landing page of the Eventivity application.
// It includes links to the Sign In and Sign Up pages, allowing users to authenticate and access the application.