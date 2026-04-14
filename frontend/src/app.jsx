import './app.css'
import Home from './components/Home/Home';
import Co from './components/course/Courses';
import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
   const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("Users");
    setAuthUser(user);
  }, []);

  return (
    <>
       <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route 
          path="/courses" 
          element={authUser ? <Co /> : <Navigate to="/login" />} 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    </>
  )
}

export default App;