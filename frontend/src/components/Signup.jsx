import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      fullname: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await axios.post("https://bookstore-project-ijvd.onrender.com/user/signup", userInfo);
      if (res.data) {
        // ❌ REMOVED: localStorage.setItem("Users", ...) 
        // This ensures they are NOT logged in yet.

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          // ✅ Redirect to Login page instead of Home
          navigate("/login"); 
        }, 1500);
      }
    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative">
      
      {showPopup && (
        <div className="fixed top-5 right-5 alert alert-success w-auto shadow-lg z-50">
          <span>Signup Successful! Please Login to continue. 🎉</span>
        </div>
      )}

      <div className="card w-96 bg-base-100 shadow-xl p-6 relative">
        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
