import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("token", result.token);
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(result.message || "Login failed");
      }

    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-end bg-gray-900">
      <div className="h-screen bg-gray-800 shadow-2xl p-16 max-w-xl w-full flex flex-col
                      justify-start rounded-tl-3xl rounded-bl-3xl rounded-tr-md rounded-br-md">
        <h2 className="text-5xl font-extrabold text-center text-white mb-12">
          Welcome Back
        </h2>

        {message && (
          <div className={`px-6 py-3 rounded-lg mb-8 text-center font-medium ${
            message.includes("successful") ? "bg-green-700 text-white" : "bg-red-700 text-white"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 flex flex-col flex-1 justify-end mb-0">
          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-lg">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border border-gray-700 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2 text-lg">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 border border-gray-700 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-2xl transition-all transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-lg mt-6">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
