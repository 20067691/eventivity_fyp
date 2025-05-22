
// Layout.jsx
// This component serves as the main layout for the application, providing a consistent structure across different pages.

import { Outlet, useLocation } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import EventNavBar from '../components/EventNavBar';
import LandingNavBar from '../components/LandingNavBar';
import { useEvent } from '../context/EventContext'; 
import useTheme from '../hooks/useTheme';
import MapIcon from '../components/MapIcon';

export default function Layout() {
  const location = useLocation();
  const isLanding =
    location.pathname === "/" ||
    ["/signin", "/signup", "/confirm", "/profile", "/calendar"].some((path) =>
      location.pathname.startsWith(path)
    );

  const isMapButtonVisible = location.pathname !== "/";

  const { selectedEvent } = useEvent();
  const { background } = useTheme(); 

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: background }}>
      <FlashMessage />
      {isLanding ? <LandingNavBar /> : <EventNavBar />}
      <main className="flex-grow">
        <Outlet />
        {isMapButtonVisible && <MapIcon />}
      </main>
    </div>
  );
}
