import { Route, Routes, Navigate, Router } from 'react-router-dom';
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
import Select_role from './Components/Select_role.jsx';
import AuthRedirect from './Components/AuthRedirect.jsx';
import ProfileSetup from './Components/ProfileSetup.jsx';
import Recruiter from './Pages/Recruiter.jsx';
import CandidateDashBoard from './Pages/CandidateDashBoard.jsx';
import RecruiterPortal from './Pages/RecruiterPortal.jsx';

function App() {
  const { authChecked, user, loadAuth } = useAuthStore();
  const isAuthenticated=!!user;
  console.log(`Window location:${window.location.origin}`);
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
        <Route path='/candidate/dashboard' element={<ProtectedRoute><CandidateDashBoard/></ProtectedRoute>}/>
        <Route path='/select-role' element={<ProtectedRoute><Select_role/></ProtectedRoute>}/>
        <Route path='/problems' element={<ProtectedRoute><ProblemsPage/></ProtectedRoute>}/>
        <Route path='/auth-redirect' element={<ProtectedRoute><AuthRedirect/></ProtectedRoute>}/>
        <Route path='/problem/:id' element={<ProtectedRoute><ProblemPage/></ProtectedRoute>}/>
        <Route path='/session/:id' element={<ProtectedRoute><SessionPage/></ProtectedRoute>}/>
        <Route path='/candidate/setup' element={<ProtectedRoute><ProfileSetup/></ProtectedRoute>}/>
        <Route path='/recruiter/setup' element={<ProtectedRoute><Recruiter/></ProtectedRoute>}/>
        <Route path='/recruiter/dashboard' element={<ProtectedRoute><RecruiterPortal/></ProtectedRoute>}/>
        <Route path='/' element={isAuthenticated ? <Navigate to="/auth-redirect" replace /> : <HomePage/>}/>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;