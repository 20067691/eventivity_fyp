
import { Outlet, useLocation } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import EventNavBar from '../components/EventNavBar';
import LandingNavBar from '../components/LandingNavBar';
import { useEvent } from '../context/EventContext'; 
import useTheme from '../hooks/useTheme';
import MapIcon from '../components/MapIcon';

export default function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname.startsWith("/signin") || location.pathname.startsWith("/signup");
  const { selectedEvent} = useEvent();
  const { background, accent, text } = useTheme(); 
  

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: background}} >
      <FlashMessage /> {/* This renders flash messages */}
      {isLanding ? <LandingNavBar /> : <EventNavBar />}
      <main className="flex-grow">
        <Outlet /> {/* This renders the child page content */}
        <MapIcon />
      </main>
    </div>
  );
}