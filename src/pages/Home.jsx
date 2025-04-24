// Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">
      <h1 className="text-4xl font-bold text-[#552834] mb-4">Welcome to Seanchaí 2026</h1>

      {isAuthenticated ? (
        <>
          <p className="text-lg text-[#552834] mb-2">
            Signed in as <span className="font-semibold">{user.username}</span>
          </p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#552834] text-white rounded hover:bg-[#6a3b48] transition-colors"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p className="text-lg text-[#552834] mb-2">No user signed in.</p>
          <a
            href="/signin"
            className="px-4 py-2 bg-[#552834] text-white rounded hover:bg-[#6a3b48] transition-colors"
          >
            Sign In
          </a>
        </>
      )}
    </div>
  );
}


// This component serves as the landing page for the Eventivity application.
// It could include a welcome message, an overview of the app's features, or any other introductory content.
// The Login component is included to allow users to authenticate and access the application.
// The Home component is the first page users see when they visit the application, providing a friendly introduction to Eventivity.