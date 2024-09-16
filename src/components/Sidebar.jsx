import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove the user information from localStorage
    localStorage.removeItem("user"); // Adjust this key based on what you use
    localStorage.removeItem("rooms");

    // Redirect to the login or home page
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-200 p-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link to={"/homepage"} className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/add-room"} className="text-blue-500 hover:underline">
              Add Room
            </Link>
          </li>
          <li>
            <Link to={"/search-room"} className="text-blue-500 hover:underline">
              Search Room
            </Link>
          </li>
        </ul>
      </div>
      {/* Logout Option */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
