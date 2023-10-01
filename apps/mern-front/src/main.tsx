import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './layout/Layout';
import Publish from './pages/publish/Publish';
import Home from './pages/home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout>
      <Home />
    </Layout>,
  },
  {
    path: "/publish",
    element: <Layout><Publish /></Layout>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    {/* <Layout> */}
      <RouterProvider router={router} />
    {/* </Layout> */}
  </StrictMode>
);
