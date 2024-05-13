import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import './App.css'
import Index from './container/Index/index';
import About from './container/About/about';

import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
// import 'zarm/dist/zarm.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);

  // return <RouterProvider router={routes} />;
  return <ConfigProvider locale={zhCN}>
    <RouterProvider router={routes} />
  </ConfigProvider>
}

export default App
