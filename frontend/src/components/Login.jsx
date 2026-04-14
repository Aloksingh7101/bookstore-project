import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await axios.post(
        "https://bookstore-project-ijvd.onrender.com/user/login",
        userInfo
      );

      if (res.data) {
        setShowPopup(true);
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
          window.location.reload(); // ✅ important
        }, 1500);
      }

    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative">
      
      {showPopup && (
        <div className="fixed top-5 right-5 alert alert-success w-auto shadow-lg z-50">
          <span>Login Successful! Welcome back. 🎉</span>
        </div>
      )}

      <div className="card w-96 bg-base-100 shadow-xl p-6 relative">
        
        <Link 
          to="/" 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </Link>

        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;