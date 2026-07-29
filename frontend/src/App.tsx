import {
  Navigate,
  Route,
  Routes,
} from 'react-router';

import {
  GuestRoute,
  ProtectedRoute,
} from './auth/RouteGuards';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NewBusinessPage from './pages/NewBusinessPage';
import RegisterPage from './pages/RegisterPage';
import EditBusinessPage from './pages/EditBusinessPage';

export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/businesses/new"
            element={<NewBusinessPage />}
          />

          <Route
            path="/businesses/:id/edit"
            element={<EditBusinessPage />}
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate to="/dashboard" replace />
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/dashboard" replace />
        }
      />
    </Routes>
  );
}