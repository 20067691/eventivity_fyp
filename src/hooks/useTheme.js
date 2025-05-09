//useTheme.js
import { useEvent } from '../context/EventContext';

export default function useTheme() {
  const { selectedEvent } = useEvent();

  return {
    background: selectedEvent?.theme?.background || '#F7F4F4',
    accent: selectedEvent?.theme?.accent || '#9c40ff',
    text: selectedEvent?.theme?.text || '#9c40ff',
    theme: selectedEvent?.theme || {}
  };
}
// This custom hook retrieves the theme properties (background, accent, text) from the selected event in the EventContext.
// purple for Eventivity, #9c40ff for accent, #F7F4F4 for background. (default theme)
// seanchaí #552834 for text, #F7F4F4 for background, #552834 for accent.
// tech expo #8CA2CF for text, #39404D for background, #8CA2CF for accent.