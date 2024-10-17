import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./CommonComponents/Layout.jsx";
import Links from "./Links/Links.jsx";
import ProfileDetails from "./ProfileDetails/ProfileDetails.jsx";
import Preview from "./Preview/Preview.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from "./HomePage/HomePage.jsx";
import {editLinkLoader} from "./Links/EditLinksPreLoader.js";
import DynamicError from "./UI/Errors/DynamicError.jsx";
import CopyLinkPreview from "./Preview/CopyLinkPreview.jsx";
import Login from "./CommonComponents/Login.jsx";
import CreateUser from "./CommonComponents/CreateUser.jsx";
import ProtectedRoute from "./CommonComponents/ProtectedRoute.jsx";
import {AuthProvider} from "./CustomLogic/AuthProvider.jsx";

const router = createBrowserRouter([
  {
        path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {path: "/", element: <ProtectedRoute><HomePage /></ProtectedRoute>},
            {path: "/links", element: <ProtectedRoute><Links /></ProtectedRoute>},
            {path: "/profile", element: <ProtectedRoute><ProfileDetails /></ProtectedRoute>},
            {path: "/preview", element: <ProtectedRoute><Preview /></ProtectedRoute>},
            {path: "/preview-linksGroup/:id", element: <ProtectedRoute><Preview /></ProtectedRoute>},
            {path: "/edit-links/:id", element: <ProtectedRoute><Links /></ProtectedRoute>, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "/edit-profile/:id", element: <ProtectedRoute><ProfileDetails /></ProtectedRoute>, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "edit-preview/:id", element: <ProtectedRoute><Preview /></ProtectedRoute>},
            {path: "/:username/:id", element: <ProtectedRoute><CopyLinkPreview /></ProtectedRoute>},
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/create-user",
        element: <CreateUser />
    }
]);

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
          <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
