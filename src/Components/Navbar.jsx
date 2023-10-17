"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res.data.message);
      localStorage.setItem("user", "");
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
      setUser(null);
    } catch (error) {
      toast.error(`${res.data.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <nav className="bg-gradient-to-b from-green-500 to-green-700 p-4 fixed top-0 left-0 w-full ">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">SAM</div>

        <div className="flex items-center space-x-4">
          <a className="text-white" href="#">
            Home
          </a>

          {user != null ? (
            <div className="relative group">
              <a className="text-white p-3 " href="#">
                Join Seminar
              </a>
              <a className="text-white p-3 " href="#">
                Create Seminar
              </a>
              <button
                onClick={toggleDropdown}
                className="text-white group-hover:bg-white group-hover:text-green-500 hover:rounded-md hover:scale-125 transition-all ease-in-out font-bold text-lg "
              >
                {user.name}
                <svg
                  className="h-4 w-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <a
                    className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    href="#"
                  >
                    Past Classes
                  </a>
                  <a
                    className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    href="#"
                  >
                    Settings
                  </a>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link className="text-white" href="/dashboard/login">
                Login
              </Link>
              <Link className="text-white" href="/dashboard/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
