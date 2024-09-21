import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./CommonComponents/Layout.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import ProfileDetails from "./ProfileDetails/ProfileDetails.jsx";
import Preview from "./Preview/Preview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/profile", element: <ProfileDetails />},
      {path: "/preview", element: <Preview />}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
