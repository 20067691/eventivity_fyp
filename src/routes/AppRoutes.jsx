import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import ConfirmAccount from '../pages/ConfirmAccount';
import SignIn from '../pages/SignIn';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<ConfirmAccount />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}
// This code sets up a simple React Router with three routes: Home, Schedule, and Forum.
// Each route is associated with a component that renders the respective content.