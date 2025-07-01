import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { RootLayout } from "./app/Layout";
import { UserProvider } from "./context/userContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router}> </RouterProvider>
    </UserProvider>
  );
}

export default App;
