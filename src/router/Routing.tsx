import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { ParticleMorphing } from "../pages/lab/ParticleMorphing";
export const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/lab/particle_morphing",
      element: <ParticleMorphing />,
    },
  ]);

  return <RouterProvider router={router} />;
};
