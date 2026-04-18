import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { LandingPage } from './pages/LandingPage';
import { UserDashboard, WorkerDashboard, AdminDashboard } from './pages/Dashboards';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { ServicesPage } from './pages/ServicesPage';
import { AuthGuard } from './components/AuthGuard';
import { BookingPage } from './pages/BookingPage';
import { Footer } from './components/Footer';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#16161f',
          color: '#f0eefc',
          border: '1px solid rgba(255,255,255,0.07)',
        }
      }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services/:category" element={<ServicesPage />} />
        <Route path="/categories" element={<LandingPage />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <AuthGuard allowedRoles={['user', 'admin', 'worker']}>
            <ProfilePage />
          </AuthGuard>
        } />
        <Route path="/dashboard" element={
          <AuthGuard allowedRoles={['user']}>
            <UserDashboard />
          </AuthGuard>
        } />
        <Route path="/booking/:serviceId" element={
          <AuthGuard allowedRoles={['user']}>
            <BookingPage />
          </AuthGuard>
        } />
        <Route path="/worker" element={
          <AuthGuard allowedRoles={['worker']}>
            <WorkerDashboard />
          </AuthGuard>
        } />
        <Route path="/admin" element={
          <AuthGuard allowedRoles={['admin']}>
            <AdminDashboard />
          </AuthGuard>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
