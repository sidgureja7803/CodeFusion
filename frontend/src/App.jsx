import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import Layout from "./layouts/Layout";
import { LandingPage } from "./LandingPage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import Playlists from "./pages/Playlists";
import Profile from "./pages/Profile";
import { Analytics } from "@vercel/analytics/react";
import { useAuthStore } from "./store/useAuthStore";
import ToastContainer from "./components/ToastContainer";
import "./input.css";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./pages/admin/AddProblem";
import EditProblem from "./pages/EditProblem";
import { ProblemPage } from "./pages/ProblemPage";
import { Loader } from "./components/Loader";
import RevisionProblems from "./pages/RevisionProblems";
import DSASheets from "./pages/DSASheets";
import DSASheetDetail from "./pages/DSASheetDetail";
import { useThemeStore } from "./store/useThemeStore";
import FirebaseDebugPanel from "./components/FirebaseDebugPanel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Separate component to handle location and auth state
function AppRoutes() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const { initializeTheme } = useThemeStore();
  const appRef = useRef(null);

  useEffect(() => {
    initializeTheme();
    
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Page transition animation
      gsap.from(".page-transition", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Smooth scroll animation
      gsap.to("html, body", {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        duration: 0.5,
        ease: "power2.inOut"
      });
    }, appRef);

    return () => ctx.revert();
  }, [initializeTheme, location.pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Create a Protected Route component to handle authentication checks consistently
  const ProtectedRoute = ({ children }) => {
    if (isCheckingAuth) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <Loader />
        </div>
      );
    }

    if (!authUser && !isCheckingAuth) {
      const from = {
        pathname: location.pathname,
        search: location.search,
      };
      return <Navigate to="/login" state={{ from }} replace />;
    }

    return children;
  };

  return (
    <div ref={appRef} className="page-transition">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate
                to={{
                  pathname: location.state?.from?.pathname || "/dashboard",
                  search: location.state?.from?.search || "",
                }}
                replace
              />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            authUser ? (
              <Navigate
                to={{
                  pathname: location.state?.from?.pathname || "/dashboard",
                  search: location.state?.from?.search || "",
                }}
                replace
              />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/problem/:id"
          element={
            <ProtectedRoute>
              <ProblemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revision"
          element={
            <ProtectedRoute>
              <RevisionProblems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dsasheets"
          element={
            <ProtectedRoute>
              <DSASheets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dsasheets/:sheetId"
          element={
            <ProtectedRoute>
              <DSASheetDetail />
            </ProtectedRoute>
          }
        />
        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={
              <ProtectedRoute>
                <AddProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/edit/:id"
            element={
              <ProtectedRoute>
                <EditProblem />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Analytics />
      {import.meta.env.MODE === 'development' && <FirebaseDebugPanel />}
    </>
  );
}

export default App;
