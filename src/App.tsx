import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { AuthContext } from './context/auth';

import Layout from './routers/layout';
import Home from './routers/home';
import Register from './routers/register';
import Share from './routers/share';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to='/' replace />;

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path='/share' element={<Share />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
