import { Route, Routes } from 'react-router';
import Home from '../../pages/Home';

const Rout = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default Rout;
