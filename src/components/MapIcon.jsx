import { useNavigate, useLocation } from 'react-router-dom';

export default function MapIcon() {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <button
      onClick={() => navigate("/")}
      className="fixed bottom-40 left-6 bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      aria-label="Back to map"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#212122]">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    </button>
  );
}
