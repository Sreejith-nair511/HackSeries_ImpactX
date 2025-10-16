import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import Donate from './pages/Donate';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/ngo" element={<NGODashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 ImpactX. Transparent & Verifiable Disaster Relief Funding on Algorand.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;