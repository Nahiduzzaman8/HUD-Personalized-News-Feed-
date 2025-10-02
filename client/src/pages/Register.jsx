import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/api/register", {
        username, email, password
      });

      setMessage(response.data.message);

      // Clear form
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect to login
      setTimeout(() => navigate("/login"), 1500);

    }catch(e){
      setMessage(e.response?.data?.error || "Network or server error");
    }
  }

return (
  <div className="min-h-screen flex items-center justify-end bg-gray-900 px-8">
    <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl p-12 max-w-lg w-full text-gray-100">
      <h2 className="text-4xl font-extrabold text-center text-white mb-8">
        Create Your Account
      </h2>

      {message && (
        <div className="bg-red-600 text-white px-5 py-3 rounded-lg mb-6 text-center font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 font-medium mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-3 border border-gray-600 rounded-xl bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-600 rounded-xl bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-600 rounded-xl bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          Register
        </button>
      </form>

      <p className="mt-8 text-center text-gray-300 text-lg">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  </div>
);



}

export default Register;

