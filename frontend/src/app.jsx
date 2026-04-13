import './app.css'
import Home from './components/Home/Home';
import Co from './components/course/Courses';
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  // Check if user is logged in from localStorage
  const authUser = localStorage.getItem("Users");

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* 🔐 Protected Route: If user exists, show Co, else redirect to Signup */}
          <Route 
            path="/courses" 
            element={authUser ? <Co /> : <Navigate to="/signup" />} 
          />
          
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App;