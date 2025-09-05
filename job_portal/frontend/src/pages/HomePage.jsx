import React, { useEffect, useState } from "react";
import axios from "axios";
import JobSearchBar from "../components/JobSearchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // ✅ Chat states
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to Support! How can we help you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await axios.get("https://job-portal-backend-15.onrender.com/api/jobs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.status === 200 && Array.isArray(response.data.data)) {
          setJobs(response.data.data);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')] bg-cover bg-center h-[380px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="relative z-10 text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Your Career, Your Future
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover opportunities, connect with companies, and build your dream career.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-white text-blue-900 rounded-lg shadow-lg font-semibold hover:scale-105 transition"
            >
              🚀 Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-20 max-w-3xl mx-auto -mt-8">
        <JobSearchBar />
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">🔍 Search Jobs</h3>
            <p className="text-gray-600">Explore jobs that match your skills and goals.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">📑 Apply Easily</h3>
            <p className="text-gray-600">Apply with just a few clicks and get noticed fast.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">🤝 Get Hired</h3>
            <p className="text-gray-600">Land the job you’ve always wanted.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Why Choose Job Portal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-800">✔ Trusted by Thousands</h3>
            <p className="text-gray-600 mt-2">
              Join a growing network of job seekers and recruiters worldwide.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-800">✔ Fast & Easy</h3>
            <p className="text-gray-600 mt-2">
              Job applications made simple and efficient.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-800">✔ Career Growth</h3>
            <p className="text-gray-600 mt-2">
              Find opportunities that boost your career forward.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Floating Chat Support Section */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-white border border-gray-300 p-4 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition z-50"
        >
          {/* Chat Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-blue-600"
          >
            <path d="M12 3C6.48 3 2 6.92 2 12c0 2.4 1.02 4.56 2.71 6.2L4 21l3.09-1.64C8.3 20.43 10.07 21 12 21c5.52 0 10-3.92 10-9s-4.48-9-10-9z" />
          </svg>
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 h-96 shadow-lg rounded-lg border bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <span className="font-semibold">Chat Support</span>
            <button onClick={() => setShowChat(false)} >✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t p-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
