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
import Profiles from "./CommonComponents/Profiles.jsx";
import CreateProfile from "./CommonComponents/CreateProfile.jsx";
import {ProfileProvider} from "./CustomLogic/ProfileProvider.jsx";
import NotFoundError from "./UI/Errors/NotFoundError.jsx";
import Settings from "./CommonComponents/Settings.jsx";
import ResetPassword from "./CommonComponents/ResetPassword.jsx";
import ForgetPassword from "./CommonComponents/ForgetPassword.jsx";
import {Toaster} from "react-hot-toast";

const router = createBrowserRouter([
  {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      errorElement: <NotFoundError />,
        children: [
            {path: "/", element: <ProtectedRoute><HomePage /></ProtectedRoute>, errorElement: <NotFoundError />},
            {path: "/:username/create-links", element: <ProtectedRoute><Links /></ProtectedRoute>, errorElement: <NotFoundError />},
            {path: "/:username/create-profile", element: <ProtectedRoute><ProfileDetails /></ProtectedRoute>, errorElement: <NotFoundError />},
            {path: "/:username/new-group-preview", element: <ProtectedRoute><Preview /></ProtectedRoute>, errorElement: <NotFoundError />},
            {path: "/:username/preview-linksGroup/:id", element: <ProtectedRoute><Preview /></ProtectedRoute>, errorElement: <NotFoundError />},
            {path: "/:username/edit-links/:id", element: <ProtectedRoute><Links /></ProtectedRoute>, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "/:username/edit-profile/:id", element: <ProtectedRoute><ProfileDetails /></ProtectedRoute>, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "/:username/edit-preview/:id", element: <ProtectedRoute><Preview /></ProtectedRoute>},
        ]
    },
    {
        path: "/:username/:id",
        element: <CopyLinkPreview />,
        errorElement: <NotFoundError />

    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    },
    {
        path: "/forget-password",
        element:<ForgetPassword />
    },
    {
        path: "/create-user",
        element: <CreateUser />
    },
    {
        "path": "/create-profile",
        element: <CreateProfile />
    },
    {
        path: "/profiles",
        element: <ProtectedRoute><Profiles /></ProtectedRoute>
    },
    {
        path: "/:username/settings",
        element : <ProtectedRoute><Settings/></ProtectedRoute>
    }
]);

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <ProfileProvider>
                <RouterProvider router={router}></RouterProvider>
              </ProfileProvider>
          </AuthProvider>
          <Toaster />
          <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
