//EventContext.jsx
import { createContext, useEffect, useContext, useState } from 'react';

const EventContext = createContext();

const defaultEvent = {
  id: "Eventivity",
  name: "Eventivity",
  theme: {
    background: '#F7F4F4',
    accent: '#9c40ff',
    text: '#9c40ff'
  }
};

export function EventProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(() => { 
  const storedEvent = localStorage.getItem('selectedEvent');
  return storedEvent ? JSON.parse(storedEvent) : defaultEvent;
});

const resetToDefaultEvent = () => {
  setSelectedEvent(defaultEvent);
  localStorage.removeItem('selectedEvent');
};

useEffect(() => {
    if (selectedEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    } else {
      localStorage.removeItem('selectedEvent');
    }
  }, [selectedEvent]);

  return (
    <EventContext.Provider value={{ selectedEvent, setSelectedEvent, resetToDefaultEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  return useContext(EventContext);
}