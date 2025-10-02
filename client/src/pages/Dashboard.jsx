import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [preference, setPreference] = useState("");
  const [allpreference, setAllpreference] = useState([]); 
  const [news, setNews] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (preference.trim() === "") return;
    setAllpreference((prev) => [...prev, preference.trim()]);
    setPreference("")
  };
  

  useEffect(() => {

    const sendPreferenceAndGetNews = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/getNews",
          allpreference, // directly send the array
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ Backend response:", res.data);

        // Update news state
        const articles = res.data.articles ;
        setNews(articles.slice(0, 20));
        
      } catch (er) {
        console.error("❌ Error sending preferences:", er);
      }
    };
    
    sendPreferenceAndGetNews()
  },[allpreference])



  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-gray-800 p-6 flex flex-col gap-6 sticky top-0 h-screen">
        
        {/* Section A */}
        <div id="a" className="bg-gray-700 p-5 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Add your preferences</label>
            <input 
              type="text" 
              value={preference} 
              onChange={(e) => setPreference(e.target.value)} 
              placeholder="e.g. Sports, AI, Tech"
              className="px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-600 text-white py-2 rounded-lg font-bold transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Section B */}
        <div id="b" className="bg-gray-700 p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-3">Your Preferences</h2>
          <ul className="space-y-2">
            {allpreference.length > 0 ? (
              allpreference.map((pref, index) => (
                <li 
                  key={index} 
                  className="px-4 py-2 bg-gray-600 rounded-lg border border-gray-500 text-gray-300"
                >
                  {pref}
                </li>
              ))
            ) : (
              <p className="text-gray-400">No preferences added yet.</p>
            )}
          </ul>
        </div>
      </div>

      {/* MAIN HERO */}
      <div id="c" className="flex-1 bg-gray-900 p-10">
        <h1 className="text-3xl font-bold mb-6">Your Personalized News</h1>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 flex flex-col"
              >
                {/* Image */}
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title || "No Title"}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* News Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    {item.title || "No Title"}
                  </h2>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-4">
                    {item.description || item.content || "No description available"}
                  </p>

                  {/* Author and Source */}
                  <div className="text-gray-400 text-xs mb-2 flex justify-between">
                    <span>{item.author || "Unknown Author"}</span>
                    <span>{item.source?.name || "Unknown Source"}</span>
                  </div>

                  {/* Published Date */}
                  <div className="text-gray-500 text-xs mb-3">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleString()
                      : "Unknown Date"}
                  </div>

                  {/* Read More Button */}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Read More
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No news available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
