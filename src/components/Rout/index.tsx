import { Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import Schools from '../../pages/Schools';
import Subscription from '../../pages/Subscription';
import AdminRole from '../../pages/AdminRole';
import AuditLogs from '../../pages/AuditLogs';
import Login from '../../pages/Login';
import PrivateRoute from '../PrivateRoute';

const Rout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/schools"
        element={
          <PrivateRoute>
            <Schools />
          </PrivateRoute>
        }
      />
      <Route
        path="/subscription"
        element={
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-role"
        element={
          <PrivateRoute>
            <AdminRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/audit-logs"
        element={
          <PrivateRoute>
            <AuditLogs />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Rout;
