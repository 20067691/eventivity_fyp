// Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-[#F7F4F4] shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-[#552834]">
          Eventivity
        </div>

        {/* Navigation links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-[#552834] hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/schedule" className="text-[#552834] hover:underline">
                Schedule
              </Link>
            </li>
            <li>
              <Link to="/forum" className="text-[#552834] hover:underline">
                Forum
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
