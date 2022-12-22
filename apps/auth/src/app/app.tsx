import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home/component';
import Verify from './views/verify/component';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route path="/verify" element={<Verify redirectURL="/login" />} />
    </Routes>
  );
};

export default App;

