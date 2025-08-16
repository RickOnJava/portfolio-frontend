import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Addons/Login";
import Signup from "./components/Addons/Signup";
import OtpVerification from "./components/Addons/OtpVerification";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import NewReview from "./components/Review_Pages_New/Review";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/account/edit",
    element: <EditProfile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp-verification/:email/:phone",
    element: <OtpVerification />
  },
  {
    path: "/portfolio/review",
    element: <NewReview/>
  }
]);

function App() {

  return (
    <>
    <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;