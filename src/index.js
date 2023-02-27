import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/layout";
import Index from "./routes/index";
import Webmaster from "./routes/webmaster";
import Websurfer from "./routes/websurfer";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/webmaster",
        element: <Webmaster />,
      },
      {
        path: "/websurfer",
        element: <Websurfer />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
