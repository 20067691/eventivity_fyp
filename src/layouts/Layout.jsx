
import { Outlet, useLocation } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import EventNavBar from '../components/EventNavBar';
import LandingNavBar from '../components/LandingNavBar';

export default function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname.startsWith("/signin") || location.pathname.startsWith("/signup");

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4F4]">
      <FlashMessage /> {/* This renders flash messages */}
      {isLanding ? <LandingNavBar /> : <EventNavBar />}
      <main className="flex-grow">
        <Outlet /> {/* This renders the child page content */}
      </main>
    </div>
  );
}