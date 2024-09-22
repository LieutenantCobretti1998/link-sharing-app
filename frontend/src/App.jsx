import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./CommonComponents/Layout.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import ProfileDetails from "./ProfileDetails/ProfileDetails.jsx";
import Preview from "./Preview/Preview.jsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

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

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
  )
}

export default App
