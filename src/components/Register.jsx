import React, { useState } from "react";

export default function Register({ onLoginView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
    } else {
      alert("User signed up successfully!");
      setErrorMessage({});
      localStorage.setItem("user", JSON.stringify({ username, password }));
      onLoginView();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl mb-6">Sign Up</h2>
      <input
        value={username}
        className={`mb-4 w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage.username ? "border-red-500" : ""
        }`}
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      {errorMessage.username && (
        <p className="text-red-500">{errorMessage.username}</p>
      )}
      <br />
      <input
        value={password}
        className={`mb-4 w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage.password ? "border-red-500" : ""
        }`}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage.username && (
        <p className="text-red-500">{errorMessage.password}</p>
      )}
      <br />
      <input
        value={confirmPassword}
        className={`mb-4 w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errorMessage.confirmPassword ? "border-red-500" : ""
        }`}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage.confirmPassword && (
        <p className="text-red-500">{errorMessage.confirmPassword}</p>
      )}
      <br />
      <button
        type="submit"
        className="text-xl bg-blue-500 px-6 py-2 text-white rounded-md w-full"
      >
        Sign Up
      </button>
    </form>
  );
}
