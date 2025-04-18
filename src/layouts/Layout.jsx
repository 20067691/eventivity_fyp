
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar'; // Import the Navbar component
import FlashMessage from '../components/FlashMessage';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F4F4]">
        <FlashMessage /> {/* This renders flash messages */}
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This renders the child page content */}
      </main>
    </div>
  );
}