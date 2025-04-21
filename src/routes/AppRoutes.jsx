import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import ConfirmAccount from '../pages/ConfirmAccount';
import SignIn from '../pages/SignIn';
import Layout from '../layouts/Layout'; 
import Forum from '../pages/Forum'; 
import Schedule from '../pages/Schedule'; 
import ProtectedRoute from '../components/ProtectedRoute'; 


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="confirm" element={<ConfirmAccount />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forum" element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          } />
          <Route path="schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </Router>
  );
}
// This code sets up a simple React Router with three routes: Home, Schedule, and Forum.
// Each route is associated with a component that renders the respective content.