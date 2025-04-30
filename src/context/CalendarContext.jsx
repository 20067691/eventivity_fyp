import { createContext, useContext, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [savedEvents, setSavedEvents] = useState([]);

  // Function to add an event to the calendar
  const addEvent = (event) => {
    setSavedEvents((prev) => {
        const existingEvent = prev.some((e) => e.id === event.id);
        if (existingEvent) {
            return prev;
        } else {
            return [...prev, event];
        }
    });
  };

  // Function to remove an event
  const removeEvent = (eventId) => {
    setSavedEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <CalendarContext.Provider value={{ savedEvents, addEvent, removeEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  return useContext(CalendarContext);
}
