import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import ToastNotification from "./Components/common/ToastNotification/ToastNotification";

const Login = lazy(() => import("./Components/Login"));
const Home = lazy(() => import("./Components/Home"));

function App() {
  return (
    <Provider store={Store}>
      <ToastNotification>
        <Router>
          <Suspense fallback={<div className="spinner">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastNotification>
    </Provider>
  );
}

export default App;
