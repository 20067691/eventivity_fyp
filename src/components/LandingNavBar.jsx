// src/components/LandingNavBar.jsx
import { Link } from 'react-router-dom';

export default function LandingNavBar() {
  return (
    <header className="bg-[#F7F4F4] shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-[#552834]">Eventivity</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/signin" className="text-[#552834] hover:underline">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-[#552834] hover:underline">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
// This component serves as the navigation bar for the landing page of the Eventivity application.
// It includes links to the Sign In and Sign Up pages, allowing users to authenticate and access the application.