import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "react-hot-toast";
import Spinner from "./UI/Spinner.jsx";
import { editLinkLoader } from "./Links/EditLinksPreLoader.js";
import { AuthProvider } from "./CustomLogic/AuthProvider.jsx";
import { ProfileProvider } from "./CustomLogic/ProfileProvider.jsx";

// Lazy load all components
const Layout = lazy(() => import('./CommonComponents/Layout.jsx'));
const Links = lazy(() => import('./Links/Links.jsx'));
const ProfileDetails = lazy(() => import('./ProfileDetails/ProfileDetails.jsx'));
const Preview = lazy(() => import('./Preview/Preview.jsx'));
const HomePage = lazy(() => import('./HomePage/HomePage.jsx'));
const CopyLinkPreview = lazy(() => import('./Preview/CopyLinkPreview.jsx'));
const Login = lazy(() => import('./CommonComponents/Login.jsx'));
const CreateUser = lazy(() => import('./CommonComponents/CreateUser.jsx'));
const ProtectedRoute = lazy(() => import('./CommonComponents/ProtectedRoute.jsx'));
const Profiles = lazy(() => import('./CommonComponents/Profiles.jsx'));
const CreateProfile = lazy(() => import('./CommonComponents/CreateProfile.jsx'));
const Settings = lazy(() => import('./CommonComponents/Settings.jsx'));
const ResetPassword = lazy(() => import('./CommonComponents/ResetPassword.jsx'));
const ForgetPassword = lazy(() => import('./CommonComponents/ForgetPassword.jsx'));
const NotFoundError = lazy(() => import('./UI/Errors/NotFoundError.jsx'));
const DynamicError = lazy(() => import('./UI/Errors/DynamicError.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <ProtectedRoute><Layout /></ProtectedRoute>
      </Suspense>
    ),
    errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><HomePage /></ProtectedRoute>
          </Suspense>
        ),
        errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
      },
      {
        path: "/:username/create-links",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><Links /></ProtectedRoute>
          </Suspense>
        ),
        errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
      },
      {
        path: "/:username/create-profile",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><ProfileDetails /></ProtectedRoute>
          </Suspense>
        ),
        errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
      },
      {
        path: "/:username/new-group-preview",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><Preview /></ProtectedRoute>
          </Suspense>
        ),
        errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
      },
      {
        path: "/:username/preview-linksGroup/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><Preview /></ProtectedRoute>
          </Suspense>
        ),
        errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
      },
      {
        path: "/:username/edit-links/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><Links /></ProtectedRoute>
          </Suspense>
        ),
        loader: editLinkLoader,
        errorElement: <Suspense fallback={<Spinner />}><DynamicError /></Suspense>
      },
      {
        path: "/:username/edit-profile/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><ProfileDetails /></ProtectedRoute>
          </Suspense>
        ),
        loader: editLinkLoader,
        errorElement: <Suspense fallback={<Spinner />}><DynamicError /></Suspense>
      },
      {
        path: "/:username/edit-preview/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute><Preview /></ProtectedRoute>
          </Suspense>
        )
      },
    ]
  },
  {
    path: "/:username/:id",
    element: (
      <Suspense fallback={<Spinner />}>
        <CopyLinkPreview />
      </Suspense>
    ),
    errorElement: <Suspense fallback={<Spinner />}><NotFoundError /></Suspense>
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <Suspense fallback={<Spinner />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<Spinner />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "/create-user",
    element: (
      <Suspense fallback={<Spinner />}>
        <CreateUser />
      </Suspense>
    ),
  },
  {
    path: "/create-profile",
    element: (
      <Suspense fallback={<Spinner />}>
        <CreateProfile />
      </Suspense>
    ),
  },
  {
    path: "/profiles",
    element: (
      <Suspense fallback={<Spinner />}>
        <ProtectedRoute><Profiles /></ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/:username/settings",
    element: (
      <Suspense fallback={<Spinner />}>
        <ProtectedRoute><Settings /></ProtectedRoute>
      </Suspense>
    ),
  },
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
  );
}

export default App;
