import { useState } from "react";
import defaultAvatar from "../assets/react.svg";
import useTheme from "../hooks/useTheme";

export default function UserProfile() {
  const [bio, setBio] = useState("");
  const { accent, background } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screenpx-4" style={{ backgroundColor: background }}>
      
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm flex flex-col items-center space-y-4">

        <img
          src={defaultAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2" style={{ borderColor: accent }}
        />

        
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short introduction about yourself..."
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff] resize-none"
          rows={4}
        />

      </div>

    </div>
  );
}
