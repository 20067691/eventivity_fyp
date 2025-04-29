import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import useTheme from '../hooks/useTheme';

export default function FlashMessage() {
  const { flashMessage, setFlashMessage } = useAuth();
  const { accent } = useTheme(); 

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null); // Clear after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage, setFlashMessage]);

  if (!flashMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-white py-2 px-6 rounded shadow-md z-50" style={{ backgroundColor: accent }}>
      {flashMessage}
    </div>
  );
}
