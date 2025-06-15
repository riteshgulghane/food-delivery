import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ToastNotification from './Components/common/ToastNotification/ToastNotification';
import ProtectedRoute from './Components/common/ProtectedRoute';

const Login = lazy(() => import('./Components/Login/Login'));
const Home = lazy(() => import('./Components/Home'));

function App() {
  return (
    <ToastNotification>
      <Router>
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ToastNotification>
  );
}

export default App;
