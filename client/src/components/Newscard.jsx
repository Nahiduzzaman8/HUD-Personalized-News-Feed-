import React from "react";

function NewsCard({ news }) {
  return (
    <div className="max-w-sm rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition duration-200">
      {/* Favicon + Source */}
      <div className="flex items-center space-x-3 mb-3">
        <img src={news.favicon} alt="favicon" className="w-6 h-6 rounded" />
        <span className="text-sm text-gray-600 font-medium">{news.source}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        <a href={news.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          {news.title}
        </a>
      </h2>

      {/* Snippet */}
      <p className="text-sm text-gray-600 mb-3">{news.snippet}</p>

      {/* Link */}
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-blue-500 text-sm font-medium hover:underline"
      >
        Visit Site →
      </a>
    </div>
  );
}

export default NewsCard