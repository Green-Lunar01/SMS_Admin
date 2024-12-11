import { Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import Schools from '../../pages/Schools';
import Subscription from '../../pages/Subscription';
import AdminRole from '../../pages/AdminRole';
import AuditLogs from '../../pages/AuditLogs';

const Rout = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/schools" element={<Schools />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/admin-role" element={<AdminRole />} />
      <Route path="/audit-logs" element={<AuditLogs />} />
    </Routes>
  );
};

export default Rout;
