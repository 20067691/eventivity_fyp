//EventContext.jsx
import { createContext, useEffect, useContext, useState } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(() => { 
  const storedEvent = localStorage.getItem('selectedEvent');
  return storedEvent ? JSON.parse(storedEvent) : null;
});

useEffect(() => {
    if (selectedEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    } else {
      localStorage.removeItem('selectedEvent');
    }
  }, [selectedEvent]);

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  return useContext(EventContext);
}