import React, { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [gl, setGl] = useState("");
  const [q, setQ] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/scrape", {
        gl,
        q,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const featuredNews = [
    {
      title: "Major Tech Breakthrough in AI Development",
      source: "TechDaily",
      rating: "4.8",
      time: "2h ago",
    },
    {
      title: "Global Summit Addresses Climate Change",
      source: "WorldNews",
      rating: "4.9",
      time: "3h ago",
    },
  ];

  return (
    <div className="min-h-screen  text-white">
      <nav className="bg-white/10 backdrop-blur-lg p-4 flex items-center justify-between border-b border-white/10 shadow-md">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </Link>
          <h1 className="text-white text-lg font-semibold">
            Retun to Home Page
          </h1>
        </div>
      </nav>

      {/* Search Section */}
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">AI News Scraper</h1>
        <p className="text-white/70 mb-6">
          Get the latest news by entering a country code and a search query.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter country code (e.g., in)"
            value={gl}
            onChange={(e) => setGl(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter search query"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 transition-all text-white font-semibold rounded-lg shadow-lg cursor-pointer"
          >
            Search News
          </button>
        </div>

        <Link to="/demo/anchor">
          <button className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-all text-white font-semibold rounded-xl shadow-lg cursor-pointer">
            AI Anchor
          </button>
        </Link>
      </div>

      {/* Featured Stories */}
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Featured Stories</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredNews.map((news) => (
            <div
              key={news.title}
              className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="font-bold text-lg mb-2">{news.title}</h3>
              <p className="text-white/70 mb-2">
                {news.source} • {news.time}
              </p>
              <div className="flex items-center bg-gray-700 px-2 py-1 rounded w-max">
                <Star className="w-4 h-4 text-green-400" />
                <span className="ml-1 text-sm">{news.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
