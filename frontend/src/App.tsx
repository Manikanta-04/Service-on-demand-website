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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1d27',
            color: '#e8e6f0',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#2dd4bf', secondary: '#1a1d27' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#1a1d27' } },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services/:category" element={<ServicesPage />} />
        <Route path="/services" element={<LandingPage />} />
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
