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

const router = createBrowserRouter([
  {
        path: "/",
        element: <Layout />,
        children: [
            {path: "/", element: <HomePage />},
            {path: "/links", element: <Links />},
            {path: "/profile", element: <ProfileDetails />},
            {path: "/preview", element: <Preview />},
            {path: "/preview-linksGroup/:id", element: <Preview />},
            {path: "/edit-links/:id", element: <Links />, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "/edit-profile/:id", element: <ProfileDetails />, loader: editLinkLoader, errorElement: <DynamicError />},
            {path: "edit-preview/:id", element: <Preview />},
            {path: "/:username/:id", element: <CopyLinkPreview />},
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
        <RouterProvider router={router}></RouterProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
