import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin((prev) => !prev);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister((prev) => !prev);
    setShowLogin(false);
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="bg-gray-400 text-white p-4 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Smart House</h1>

        <div className="flex justify-center space-x-4">
          {!showLogin && !showRegister && (
            <>
              <button
                className="text-xl bg-blue-500 px-6 py-2 text-white rounded-md"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className="text-xl bg-blue-500 px-6 py-2 text-white rounded-md"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </>
          )}

          {showLogin && (
            <button
              className="text-xl bg-blue-500 px-6 py-2 text-white rounded-md"
              onClick={() => setShowLogin(false)}
            >
              Close Login
            </button>
          )}

          {showRegister && (
            <button
              className="text-xl bg-blue-500 px-6 py-2 text-white rounded-md"
              onClick={() => setShowRegister(false)}
            >
              Close Register
            </button>
          )}
        </div>

        {showLogin && (
          <div className="mt-4">
            <Login />
          </div>
        )}

        {showRegister && (
          <div className="mt-4">
            <Register onLoginView={handleLoginClick} />
          </div>
        )}
      </div>
    </div>
  );
}
