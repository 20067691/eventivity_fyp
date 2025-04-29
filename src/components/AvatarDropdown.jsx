import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import defaultAvatar from "../assets/react.svg"; 
import useTheme from '../hooks/useTheme';

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative">
      
      <img
        src={defaultAvatar} // use user's profile image -> {user?.profileImage || defaultAvatar}
        alt="User Avatar"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-[#9c40ff]"
      />

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
          <button
            onClick={() => { navigate("/profile"); setOpen(false); }}
            className="block w-full text-left px-4 py-2 text-[#552834] hover:bg-gray-100"
          >
            View Profile
          </button>
          <button
            onClick={() => { navigate("/calendar"); setOpen(false); }}
            className="block w-full text-left px-4 py-2 text-[#552834] hover:bg-gray-100"
          >
            My Calendar
          </button>
          <button
            onClick={() => {handleLogout(); setOpen(false); }}
            className="block w-full text-left px-4 py-2 text-[#552834] hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
