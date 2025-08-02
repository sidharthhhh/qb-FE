import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // ⬅️ Add this import
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CategoryDetailPage from './pages/CategoryDetailPage';
import PreviewPage from './pages/PreviewPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* ⬅️ Landing route */}
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <PrivateRoute>
            <CategoryDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/preview"
        element={
          <PrivateRoute>
            <PreviewPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
