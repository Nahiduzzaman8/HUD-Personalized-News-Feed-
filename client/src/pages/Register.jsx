import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage({ type: "success", text: "Registration successful!" });
          setTimeout(() => {
            navigate("/login"); // React Router navigation
          }, 800);
        } else {
          setMessage({
            type: "error",
            text: data.message || "Invalid credentials.",
          });
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    postData()
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        {/* Register Form Section */}
        <form className="max-w-xl w-full p-6 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-12">
            <h1 className="text-slate-900 text-4xl font-bold">Register</h1>
            <p className="text-slate-600 text-sm mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
              >
                Sign in here
              </a>
            </p>
          </div>

          {message && (
            <div
              className={`mb-4 text-sm px-4 py-3 rounded-md border ${
                message.type === "success"
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-red-50 border-red-300 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="text-slate-900 text-sm font-medium block mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                className="w-full text-sm text-slate-900 border-b border-slate-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-900 text-sm font-medium block mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full text-sm text-slate-900 border-b border-slate-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm font-medium block mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm text-slate-900 border-b border-slate-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Register
            </button>
          </div>

          <div className="my-4 flex items-center gap-4">
            <hr className="w-full border-slate-300" />
            <p className="text-sm text-slate-900 text-center">or</p>
            <hr className="w-full border-slate-300" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-4 py-2 px-4 text-[15px] font-medium tracking-wide text-slate-900 border border-slate-300 rounded-md bg-transparent hover:bg-slate-50 focus:outline-none cursor-pointer"
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"
  width="28px"
  height="28px"
  className="inline"
>
  <path
    fill="#fbc02d"
    d="M43.6 20.5H42V20H24v8h11.3C34.8 32.5 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3L37 10.8C33.6 7.7 29.1 6 24 6 13.5 6 5 14.5 5 25s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.3-.4-3.5z"
  />
  <path
    fill="#e53935"
    d="M6.3 14.7l6.6 4.8C14.4 16 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.2-5.2C33.6 7.7 29.1 6 24 6 16.3 6 9.6 10.4 6.3 14.7z"
  />
  <path
    fill="#4caf50"
    d="M24 44c5.1 0 9.6-1.7 13-4.7l-6-4.9C29 36.9 26.6 37.9 24 38c-6 0-10.8-3.9-12.6-9.2l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
  />
  <path
    fill="#1565c0"
    d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.9 6.5-9.3 6.5-3 0-5.7-1.1-7.7-3L13 37.2C16.3 40.3 20.8 42 25.9 42c9.3 0 16.8-7.5 16.8-16.8 0-1.1-.1-2.2-.3-3.2z"
  />
</svg>

            Continue with Google
          </button>
        </form>

        {/* Left Info Section */}
        <div className="max-md:order-1 h-screen min-h-full flex flex-col justify-center px-10 py-16 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
          <div className="space-y-6 max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Your <span className="text-yellow-400">Personalized</span> News
              Feed
            </h1>

            <p className="text-base md:text-lg text-blue-100">
              Stay ahead of the curve with real-time, AI-curated headlines
              crafted around your interests. No clutter, no noise — just the
              stories that matter to you.
            </p>

            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-yellow-400/20 text-yellow-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2m0 8v8m0-8c1.1 0 2-.9 2-2s-.9-2-2-2"
                    />
                  </svg>
                </div>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">
                    AI-driven recommendations
                  </span>{" "}
                  that adapt as your reading habits evolve.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-yellow-400/20 text-yellow-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Filter topics</span> and
                  create your own curated categories effortlessly.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-yellow-400/20 text-yellow-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 20h9"
                    />
                  </svg>
                </div>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Bookmark stories</span> to
                  read later — your feed, your control.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm md:text-base text-blue-200 italic">
                “Empowering readers with clarity — because the world deserves
                your attention, not your overwhelm.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
