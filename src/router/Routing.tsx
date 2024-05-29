import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@pages/Home";
import { ParticleMorphing } from "@pages/lab/particleMorphing/ParticleMorphing";
import { Blogs } from "@pages/blog/Blogs";
import { Layout } from "@components/Layout";
import { FuturisticUI } from "@pages/projects/futuristicUI/FuturisticUI";
import { ImageShader } from "@pages/lab/imageShader/ImageShader";
export const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "project/",
          children: [{ path: "futuristic_ui", element: <FuturisticUI /> }],
        },
        {
          path: "lab",
          children: [
            { path: "particle_morphing", element: <ParticleMorphing /> },
            {
              path: "imageShader",
              element: <ImageShader />,
            },
          ],
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
