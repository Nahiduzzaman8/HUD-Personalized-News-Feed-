import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    getLoginResponse();
  };

  const getLoginResponse = async () => {
    try {
      let response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        setMessage({
          type: "error",
          text: data.message || "Invalid credentials.",
        });
      } else {
        localStorage.setItem("token", data.token);
        setMessage({ type: "success", text: "Login successful!" });

        setTimeout(() => {
          navigate("/dashboard"); // React Router navigation
        }, 500);
      }
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: "Server error. Try again later." });
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
        {/* Left Info Section */}
<div className="max-md:order-1 h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 text-white overflow-hidden p-10">
  {/* Abstract floating circles for visual depth */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full opacity-15 blur-3xl"></div>

  <div className="relative z-10 max-w-md text-center space-y-6">
    {/* Heading */}
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
      Welcome Back <span className="text-yellow-300">👋</span>
    </h1>

    {/* Tagline */}
    <p className="text-base md:text-lg text-blue-100 opacity-90">
      Get instant access to your personalized AI-curated news feed.  
      Discover, save, and explore the stories that truly matter.
    </p>

    {/* Feature Cards */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
        <div className="p-2 rounded-full bg-yellow-300 text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.104 0 2-.672 2-1.5S13.104 5 12 5s-2 .672-2 1.5S10.896 8 12 8zM12 14v7m0-7a2 2 0 012-2h5.5M12 14a2 2 0 00-2-2H4.5" />
          </svg>
        </div>
        <p className="text-sm md:text-base">Curated news from trusted sources</p>
      </div>

      <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
        <div className="p-2 rounded-full bg-green-300 text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm md:text-base">Bookmark and read later</p>
      </div>

      <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
        <div className="p-2 rounded-full bg-pink-300 text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 10H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v16a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm md:text-base">AI-powered topic suggestions</p>
      </div>

      <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
        <div className="p-2 rounded-full bg-purple-300 text-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-sm md:text-base">Instant personalized dashboard</p>
      </div>
    </div>

    {/* Footer line */}
    <p className="mt-10 text-sm md:text-base text-blue-200 italic">
      Your news, your world — tailored by your interests.
    </p>
  </div>
</div>


        {/*! Form */}
        <form className="max-w-xl w-full p-6 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-12">
            <h1 className="text-slate-900 text-4xl font-bold">Sign in</h1>
            <p className="text-slate-600 text-sm mt-6">
              Don't have an account{" "}
              <a
                href="/"
                className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
              >
                Register here
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
            <div>
              <label className="text-slate-900 text-sm font-medium block mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full text-sm text-slate-900 border-b border-slate-300 focus:border-blue-600 pr-8 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-slate-900 text-sm font-medium block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-sm text-slate-900 border-b border-slate-300 focus:border-blue-600 pr-8 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-900"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Sign in
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
              width="20px"
              className="inline"
              viewBox="0 0 512 512"
            >
              <path
                fill="#fbbd00"
                d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
              />
              <path
                fill="#0f9d58"
                d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
              />
              <path
                fill="#31aa52"
                d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
              />
              <path
                fill="#3c79e6"
                d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
              />
              <path
                fill="#cf2d48"
                d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
              />
              <path
                fill="#eb4132"
                d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
              />
            </svg>
            Continue with google
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;