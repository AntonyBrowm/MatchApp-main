import './apps.scss';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Profile from './views/profile/component';
import Match from './views/match/component';
import { useAuth } from './hooks/auth';
import { FC, lazy, useEffect } from 'react';
import { AppContainer } from './components/appContainer/component';
import Home from './views/home/component';
import Config from './views/config/component';
import React from 'react';

const AuthHome = lazy(() => import('auth/home'));
const AuthVerify = lazy(() => import('auth/verify'));

const authPath=['/login'];
const privatePaths=['/','/home','/profile','/match'];
const App = () => {

  const navigate = useNavigate();
  const location= useLocation();
  const authPaths= authPath.some((path)=> path===location.pathname);
  const privatePath=privatePaths.some((path)=>path=== location.pathname);
  const { haveToken } = useAuth();


  useEffect(() => {
    if(authPaths && haveToken){
      navigate('/home');
    }
    if (privatePath && !haveToken) {
      navigate('/login');
    }
  }, [haveToken, authPath, location]);

  return (
    <div className="router">
      <div className="content">
        <Routes>
            <Route path="/" element={<AppContainer />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<React.Suspense fallback={<>...</>}><Profile /></React.Suspense>} />
            <Route path="/match" element={<Match />} />
            <Route path="/config" element={<Config />} />
          </Route>
          <Route path="/login" element={<React.Suspense fallback={<>...</>}><AuthHome /></React.Suspense>} />
          <Route path="verify" element={<AuthVerify redirectURL="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

