import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import Newscard from "../components/Newscard";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  
  const [input, setInput] = useState("");
  const [p, setP] = useState("");
  const [allprefs, setallprefs] = useState([]);
  const [news, setNews] = useState([]);
  const [raw, setRaw] = useState([]);
  const [tempNews, setTempNews] = useState([]);
  const navigate = useNavigate()

  

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (input != "") {
      setallprefs((prev) => [...prev, input]);
      setP(input);
    }
    setInput("");
  };

  const clearPreferences = () => {
    setallprefs([]);
  };

  const deletePref = (deleteIndex) => {
    setallprefs((prevItems) =>
      prevItems.filter((_, index) => index !== deleteIndex)
    );
    
  };

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");;
  };

  
  useEffect(() => {
  if (allprefs.length === 0) {
    setNews([]);       // Clear main news
    setTempNews([]);   // Clear temp search news
  }
}, [allprefs]);

  useEffect(() => {
    
    const getNews = async () => {
      try {
        let response = await axios.post("http://127.0.0.1:5000/getNews", {
          allPrefs: p,
        });
        let data = response.data.organic_results;
        setNews((prev) => [...prev, ...data]);  
        setRaw((prev) => [...prev, [response.data]]);
      } catch (error) {
        console.log("Nahid ",error);
      }
    };


    
    if (p && p.length > 0) {
      getNews();
    }
  }, [p]);

  const searchNews = (value) => {
  if (!value) {  // empty input
    setTempNews([]);
    return;
  }

  const filteredNews = [];

  raw.forEach((item) => {
    const searchQuery = item[0]?.search_parameters?.q || "";
    if (searchQuery.toLowerCase().includes(value.toLowerCase())) {
      filteredNews.push(...item[0]?.organic_results);
    }
  });

  setTempNews(filteredNews);
};



  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto  p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Personalized News Feed
            </span>
          </a>

          <div className="flex md:order-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(evt) => searchNews(evt.target.value)}
              />
            </div>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex h-auto ">
        <aside className="sticky top-0 w-1/4 dark:bg-gray-900  text-white p-6 flex flex-col justify-between h-screen shadow-lg">
          {/* Top Section: Add Preference */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 ">Add Preference</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                value={input}
                onChange={(evt) => setInput(evt.target.value)}
                placeholder="Enter preference..."
                className="p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
              >
                Add to My Preference
              </button>
            </form>
          </div>

          {/* Middle Section: Preferences List */}
          <div className="flex-1 overflow-y-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">My Preferences</h2>
              {allprefs.length > 1 && (
                <button
                  type="submit"
                  onClick={clearPreferences}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                >
                  Clear All
                </button>
              )}
            </div>

            <ul className="space-y-2">
              {allprefs.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded"
                >
                  {item}
                  <button
                    onClick={() => deletePref(index)}
                    className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section: Logout */}
          <form onSubmit={handleLogout}>
            <button
              type="submit"
              className="w-1/4 bg-gray-600 hover:bg-red-500 text-white py-2 rounded"
            >
              Logout
            </button>
          </form>
        </aside>

        {/* Placeholder for main content */}
        <div className="flex-1 p-6 bg-gray-700 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tempNews.length > 0
              ? tempNews.map((item, ind) => <Newscard key={ind} news={item} />)
              : news.map((item, ind) => <Newscard key={ind} news={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}


