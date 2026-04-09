import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Login from './Pages/Login';
import { Toaster } from "react-hot-toast";
import DashBoard from './Pages/DashBoard';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import HomePage from './Pages/HomePage.jsx';
import { useAuthStore } from './store/Auth.store.js';
import ProblemsPage from './Pages/ProblemsPage.jsx';
import ProblemPage from './Pages/ProblemPage.jsx';
import SessionPage from './Pages/SessionPage.jsx';

function App() {
  const { authChecked, isAuthenticated, loadAuth } = useAuthStore();

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  if (!authChecked) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
        <Route path='/problems' element={<ProtectedRoute><ProblemsPage/></ProtectedRoute>}/>
        <Route path='/problem/:id' element={<ProtectedRoute><ProblemPage/></ProtectedRoute>}/>
        <Route path='/session/:id' element={<ProtectedRoute><SessionPage/></ProtectedRoute>}/>
        <Route path='/' element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage/>}/>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;