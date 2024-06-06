import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home } from "@pages/Home";
import { ParticleMorphing } from "@pages/lab/particleMorphing/ParticleMorphing";
import { Blogs } from "@pages/blog/Blogs";
import { Layout } from "@components/Layout";
import { FuturisticUI } from "@pages/projects/futuristicUI/FuturisticUI";
import { ImageShader } from "@pages/lab/imageShader/ImageShader";
import { LenisDemo } from "@pages/lab/lenis/LenisDemo";
import { UvVierwer } from "@pages/projects/uvViewer/UvViewer";
export const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true, // This makes the redirect route the default child route
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "project/",
          children: [
            { path: "futuristic-ui", element: <FuturisticUI /> },
            { path: "uv-viewer", element: <UvVierwer /> },
          ],
        },
        {
          path: "lab",
          children: [
            { path: "particles-morphing", element: <ParticleMorphing /> },
            {
              path: "image-shader",
              element: <ImageShader />,
            },
            {
              path: "lenis-demo",
              element: <LenisDemo />,
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
