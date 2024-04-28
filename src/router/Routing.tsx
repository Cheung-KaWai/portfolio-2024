import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages/Home";
import { ParticleMorphing } from "@pages/lab/ParticleMorphing";
import { Blogs } from "@pages/blog/Blogs";
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
    {
      path: "/blogs",
      element: <Blogs />,
    },
  ]);

  return <RouterProvider router={router} />;
};
