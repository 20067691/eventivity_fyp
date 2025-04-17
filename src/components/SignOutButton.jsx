import { cognitoDomain, clientId, redirectUri } from '../config/authConfig';

export default function SignOutButton() {
  const handleSignOut = () => {
    const logoutUri = encodeURIComponent(redirectUri);
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

    window.location.href = logoutUrl;
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-[#552834] text-white rounded hover:bg-[#6a3b48] transition-colors"
    >
      Sign Out
    </button>
  );
}
