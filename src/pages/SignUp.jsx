import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/CognitoService';
import SuccessBanner from '../components/SuccessBanner'; 

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username.trim(), password.trim(), { email: email.trim() });
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/confirm');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">
      {!signupSuccess ? (
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#552834]">Create Account</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
            required
          />

          {/* Password Requirements */}
          <div className="text-sm mt-2 space-y-1">
            <p className={passwordValidation.length ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.length ? "✓" : "•"} At least 8 characters
            </p>
            <p className={passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.uppercase ? "✓" : "•"} At least one uppercase letter
            </p>
            <p className={passwordValidation.number ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.number ? "✓" : "•"} At least one number
            </p>
            <p className={passwordValidation.specialChar ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.specialChar ? "✓" : "•"} At least one special character
            </p>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#552834] text-white py-2 rounded hover:bg-[#6a3742] transition-colors"
          >
            Sign Up
          </button>
        </form>
      ) : (
        <SuccessBanner
          title="Account created successfully!"
          message="Redirecting to confirmation page..."
        />
      )}
    </div>
  );
}

export default SignUp;
