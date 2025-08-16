import { Suspense, lazy, useEffect, useState } from "react";

const Approach = lazy(() => import("./Approach"));
const Clients = lazy(() => import("./Clients"));
const Experience = lazy(() => import("./Experience"));
const Footer = lazy(() => import("./Footer"));
const Grid = lazy(() => import("./Grid"));
const Hero = lazy(() => import("./Hero"));
const RecentProjects = lazy(() => import("./RecentProjects"));

import "../App.css";
import { FloatingNav } from "./ui/floating-navbar";
import { navItems } from "../../data/index";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./loading-animation/Loading-screen";
import Chatbot from "./chatbot/Chatbot";
import LoadingFallback from "./LoadingFallback";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // 6 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const { isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated ) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip scroll-smooth">
      <Suspense fallback={<LoadingFallback />}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <FloatingNav navItems={navItems} />
            <Hero />
            <Grid />
            <RecentProjects />
            <Clients />
            <Experience />
            <Approach />
            <Footer />
            <Chatbot />
          </>
        )}
      </Suspense>
    </main>
  );
};

export default Home;
