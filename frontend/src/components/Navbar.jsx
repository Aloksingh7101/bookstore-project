import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link to prevent page reloads

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
   const [authUser, setAuthUser] = useState(null); // ✅ ADD THIS
  
const navigate = useNavigate();
 useEffect(() => {
    const user = localStorage.getItem("Users");
    setAuthUser(user);
  }, []);

const handleLogout = () => {
  localStorage.removeItem("Users");
  setAuthUser(null);
  alert("Logged out successfully");
  navigate("/login"); // ✅ correct way
};

  useEffect(() => {
    const element = document.documentElement;
    element.setAttribute("data-theme", theme);
    // Sync with Tailwind dark mode class if you use it
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Navitem = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/courses">Course</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About</Link></li>
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${sticky 
        ? "shadow-md bg-base-100 text-base-content" 
        : "bg-base-100 dark:bg-slate-900 text-base-content" // Added background here to fix alignment context
      }`}
    >
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* min-h-16 ensures the height never changes, preventing text from jumping */}
        <div className="navbar px-0 h-16 items-center"> 
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow border dark:border-slate-700 `z-1`">
                {Navitem}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors">Book-Store</Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{Navitem}</ul>
          </div>

          <div className="navbar-end gap-3">
            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={() => setTheme(theme === "light" ? "dark" : "light")} checked={theme === "dark"} />
              {/* Sun Icon */}
              <svg className="swap-off h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M5 12a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm12 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM11 5a1 1 0 112 0v1a1 1 0 11-2 0V5zm0 12a1 1 0 112 0v1a1 1 0 11-2 0v-1zm6.36-9.36a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0zM8.05 15.95a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0zm0-7.9a1 1 0 01-1.41 0l-.71-.71A1 1 0 017.34 5.34l.71.71a1 1 0 010 1.41zm8.49 8.49a1 1 0 01-1.41 0l-.71-.71a1 1 0 111.41-1.41l.71.71a1 1 0 010 1.41zM12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
              {/* Moon Icon */}
              <svg className="swap-on h-7 w-7 fill-current" viewBox="0 0 24 24"><path d="M21.75 15.5A9 9 0 1112.5 2.25a7 7 0 109.25 13.25z" /></svg>
            </label>

            {authUser ? (
              <button onClick={handleLogout} className="btn btn-error text-white btn-sm md:btn-md hover:scale-105 transition-all">Logout</button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm md:btn-md hover:scale-105 transition-all">Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;