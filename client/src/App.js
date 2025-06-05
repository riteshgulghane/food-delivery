import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ToastNotification from "./Components/common/ToastNotification/ToastNotification";
import { fetchCategories } from "./Store/Category.store";
import { useDispatch, useSelector } from "react-redux";
import { API_CALL_STATUS } from "./constants/constant";

const Login = lazy(() => import("./Components/Login"));
const Home = lazy(() => import("./Components/Home"));

function App() {
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStatus === API_CALL_STATUS.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  if (categoryStatus === API_CALL_STATUS.LOADING) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading categories...</p>
        </header>
      </div>
    );
  }

  if (categoryStatus === API_CALL_STATUS.FAILED) {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ color: "red" }}>Error: {categoryError}</p>
          <button onClick={() => dispatch(fetchCategories())}>Retry</button>
        </header>
      </div>
    );
  }
  return (
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
  );
}

export default App;
