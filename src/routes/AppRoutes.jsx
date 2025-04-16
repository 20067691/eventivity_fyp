import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';
import Forum from '../pages/Forum';

export default function AppRoutes() {
  return (
    <Router>
      <nav style={{ padding: '1rem' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/schedule" style={{ marginRight: '10px' }}>Schedule</Link>
        <Link to="/forum">Forum</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}
// This code sets up a simple React Router with three routes: Home, Schedule, and Forum.
// Each route is associated with a component that renders the respective content.