import { useNavigate, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function MapIcon() {
  const navigate = useNavigate();
  const location = useLocation();
  const { background, accent, text } = useTheme();


  return (
    <button
      onClick={() => navigate("/")}
      className="fixed left-10 top-1/2 transform -translate-y-1/2 
      p-4 rounded-full shadow-lg border transition hover:scale-105 bg-white"
      style={{
        color: text,
        borderColor: accent,
      }}
      aria-label="Back to map"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#212122]">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    </button>
  );
}
