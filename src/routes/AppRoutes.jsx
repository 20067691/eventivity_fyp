import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import ConfirmAccount from '../pages/ConfirmAccount';
import SignIn from '../pages/SignIn';
import Layout from '../layouts/Layout'; 
import Forum from '../pages/Forum'; 
import Schedule from '../pages/Schedule'; 
import ProtectedRoute from '../components/ProtectedRoute'; 
import Landing from '../pages/Eventivity';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="confirm" element={<ConfirmAccount />} />
          <Route path="signin" element={<SignIn />} />
          </Route>

          <Route path="/app" element={<Layout />}>
           <Route path="home" element={<Home />} />
           <Route path="schedule" element={<Schedule />} />
           <Route path="forum" element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
// This code sets up a simple React Router with three routes: Home, Schedule, and Forum.
// Each route is associated with a component that renders the respective content.