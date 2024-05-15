import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import 'zarm/dist/zarm.css';

import routes from './router/index';
import NavBar from './components/NavBar/index';

const App = () => {
  const location = useLocation();
  const needNav = ['/', '/data', '/user'];
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(needNav.includes(location.pathname));
  }, [location]);

  return <ConfigProvider primaryColor='#007fff'>
    <>
      <Routes>
        {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
      </Routes>
      {showNav && <NavBar />}
    </>
  </ConfigProvider>;
};

export default App;

