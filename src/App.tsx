import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
