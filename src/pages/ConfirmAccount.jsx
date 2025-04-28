import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmUser } from '../services/CognitoService';
import SuccessBanner from '../components/SuccessBanner';
import BeamBorder from '../components/BeamBorder';

function ConfirmAccount() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmUser(username.trim(), code.trim());
      setConfirmationSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Confirmation error:', error);
      alert('Confirmation failed: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">
      <div className="relative w-full max-w-sm bg-white p-6 rounded shadow-md overflow-hidden">
        <BeamBorder
          duration={6}
          size={200}
        />
        <BeamBorder
          duration={6}
          delay={3}
          size={200}
        />
        {!confirmationSuccess ? (
          <form
            onSubmit={handleConfirm}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-[#9c40ff]">Confirm Account</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
              required
            />

            <input
              type="text"
              placeholder="Confirmation Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
              required
            />

            <button
              type="submit"
              className="w-full mt-4 bg-[#9c40ff] text-white py-2 rounded hover:bg-[#F7F4F4] hover:text-[#9c40ff] transition-colors"
            >
              Confirm Account
            </button>
          </form>
        ) : (
          <SuccessBanner
            title="Account confirmed successfully!"
            message="Redirecting to homepage..."
          />
        )}
      </div>
    </div>
  );
}

export default ConfirmAccount;
