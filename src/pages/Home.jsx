// Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import  useTheme  from '../hooks/useTheme';

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth();
  const { selectedEvent } = useEvent();
  const { background, text, accent} = useTheme(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: background }}>
      <h1 className="text-4xl font-bold mb-4" style={{ color: text }}>Welcome to {selectedEvent.name || 'Eventivity'}</h1>
  </div>
);
}



// This component serves as the landing page for the Eventivity application.
// It could include a welcome message, an overview of the app's features, or any other introductory content.
// The Login component is included to allow users to authenticate and access the application.
// The Home component is the first page users see when they visit the application, providing a friendly introduction to Eventivity.