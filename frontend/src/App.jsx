import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./CommonComponents/Layout.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import ProfileDetails from "./ProfileDetails/ProfileDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/profile", element: <ProfileDetails />}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
