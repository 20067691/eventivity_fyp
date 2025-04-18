import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function FlashMessage() {
  const { flashMessage, setFlashMessage } = useAuth();

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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-6 rounded shadow-md z-50">
      {flashMessage}
    </div>
  );
}
