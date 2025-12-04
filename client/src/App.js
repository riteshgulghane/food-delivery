import React, { Suspense, lazy, StrictMode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ToastNotification from "./Components/common/ToastNotification/ToastNotification";
import ProtectedRoute from "./Components/common/ProtectedRoute";

const Login = lazy(() => import("./Components/Login/Login"));
const Home = lazy(() => import("./Components/Home"));
const RestaurantDetails = lazy(() =>
  import("./pages/Restaurant-Details/RestaurantDetails")
);
const Test = lazy(() => import("./Components/Test/Test"));

function App() {
  return (
    <StrictMode>
    <ToastNotification>
      <Router>
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/restaurant/:id"
              element={
                <ProtectedRoute>
                  <RestaurantDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ToastNotification>
    </StrictMode>
  );
}

export default App;
