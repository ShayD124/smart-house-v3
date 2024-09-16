import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!username || !password) {
      setErrorMessage("Please fill out both fields");
      return;
    }

    if (storedUser) {
      if (
        storedUser.username === username &&
        storedUser.password === password
      ) {
        alert("Login successful!");
        setErrorMessage("");
        navigate("/homepage");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } else {
      setErrorMessage("No registered user found");
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl mb-6">Login</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        type="text"
        placeholder="Username"
      />
      <br />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
        type="password"
        placeholder="Password"
      />
      <br />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md text-xl"
      >
        Login
      </button>
    </form>
  );
}
