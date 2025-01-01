import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "react-hot-toast";
import Spinner from "./UI/Spinner.jsx";
import { editLinkLoader } from "./Links/EditLinksPreLoader.js";
import { AuthProvider } from "./CustomLogic/AuthProvider.jsx";
import { ProfileProvider } from "./CustomLogic/ProfileProvider.jsx";
import ErrorBoundary from "./UI/Errors/GlobalErrorBoundary.jsx";
import {confirmEmailLoader} from "./Helpers/EmailAutoSending.js";
import PreviewUserLinksGroup from "./Preview/PreviewUserLinksGroup.jsx";
import GlobalErrorBoundary from "./UI/Errors/GlobalErrorBoundary.jsx";


// Lazy load all components
const Layout = lazy(() => import('./CommonComponents/Layout.jsx'));
const SubmitConfirmation = lazy(() => import("./CommonComponents/SubmitConfirmation.jsx"));
const SubmitUser = lazy(() => import("./CommonComponents/SubmitUser.jsx"));
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <ProtectedRoute><Layout /></ProtectedRoute>
        </ErrorBoundary>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <NotFoundError />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><HomePage /></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/:username/create-links",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><Links /></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/:username/create-profile",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><ProfileDetails /></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/:username/new-group-preview",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><Preview /></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/:username/preview-linksGroup/:id",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><PreviewUserLinksGroup /></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/:username/edit-links/:id",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><Links /></ProtectedRoute>
          </Suspense>
        ),
        loader: editLinkLoader,
      },
      {
        path: "/:username/edit-profile/:id",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><ProfileDetails /></ProtectedRoute>
          </Suspense>
        ),
        loader: editLinkLoader,
      },
      {
        path: "/:username/edit-preview/:id",
        element: (
          <Suspense fallback={<Spinner />}>
              <ProtectedRoute><PreviewUserLinksGroup /></ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/:username/:id",
    element: (
      <Suspense fallback={<Spinner />}>
          <CopyLinkPreview />
      </Suspense>
    ),
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
    path: "/confirm-email/:email",
    element: (
      <Suspense fallback={<Spinner />}>
          <SubmitUser />
      </Suspense>
    ),
    loader: confirmEmailLoader,
  },
  {
    path: "/confirmation/:token",
    element: (
      <Suspense fallback={<Spinner />}>
          <SubmitConfirmation />
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

function App() {
  return (
      <>
          <GlobalErrorBoundary>
              <AuthProvider>
                <ProfileProvider>
                  <RouterProvider router={router}></RouterProvider>
                </ProfileProvider>
              </AuthProvider>
              <Toaster />
              <ReactQueryDevtools />
          </GlobalErrorBoundary>
      </>

  );
}

export default App;
