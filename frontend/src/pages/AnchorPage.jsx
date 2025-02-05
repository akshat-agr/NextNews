import React, { useState, useRef } from "react";
import {
  Mic,
  MessageSquare,
  Video,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Play,
  Send,
  Radio,
} from "lucide-react";
import { Link } from "react-router-dom";

const AnchorPage = () => {
  const [activeMode, setActiveMode] = useState("video");
  const [isMicActive, setIsMicActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    setChatHistory((prev) => [...prev, { type: "user", text: chatMessage }]);

    try {
      const response = await fetch("http://localhost:5000/ask_question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: chatMessage }),
      });
      const data = await response.json();

      setChatHistory((prev) => [...prev, { type: "bot", text: data.answer || "No response." }]);
      setChatMessage(""); // Clear input field after sending message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsMicActive(true);

    recognition.onresult = (event) => {
      setChatMessage(event.results[0][0].transcript);
      setIsMicActive(false);
    };
    recognition.onerror = () => setIsMicActive(false);
  };

  const handleFullScreenToggle = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullScreen(true);
      } else {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <nav className="bg-white/10 backdrop-blur-lg p-4 flex items-center justify-between border-b border-white/10 shadow-md">
        <div className="flex items-center space-x-4">
          <Link to="/demo" className="p-2 rounded-full hover:bg-white/20 transition">
            <ArrowLeft className="text-white w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">Explore the Trending News</h1>
        </div>
      </nav>

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-6 bg-white/10 p-6 rounded-xl shadow-lg">
            <div className="w-36 h-36 bg-gray-700 rounded-xl flex items-center justify-center">
              <Play className="w-14 h-14 text-white/70" />
            </div>
            <div>
              <p className="text-xl font-semibold">Meet Your Virtual Anchor</p>
              <Link to="/demo/anchor/customize">
                <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow cursor-pointer">
                  Customize Avatar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 flex gap-6">
        <div className="flex-1">
          <div className="bg-white/10 rounded-xl overflow-hidden shadow-lg relative" ref={videoRef}>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <span className="text-white/50">{activeMode === "video" ? "AI Avatar" : "Audio Mode"}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 flex justify-between">
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="w-6 h-6 text-red-500" /> : <Volume2 className="w-6 h-6 text-white" />}
              </button>
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30" onClick={handleFullScreenToggle}>
                {isFullScreen ? <Minimize2 className="w-6 h-6 text-white" /> : <Maximize2 className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          <div className="p-6 flex items-center justify-center space-x-6">
            <button className={`p-4 rounded-full transition ${isMicActive ? "bg-red-500" : "bg-white/10 hover:bg-white/20"}`} onClick={handleMicClick}>
              <Mic className="w-6 h-6 text-white" />
            </button>
            <button className={`p-4 rounded-full transition ${isChatOpen ? "bg-[#4A044E]" : "bg-white/10 hover:bg-white/20"}`} onClick={() => setIsChatOpen(!isChatOpen)}>
              <MessageSquare className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {isChatOpen && (
          <div className="w-full max-w-md bg-[#3B0764] rounded-xl p-4 flex flex-col shadow-lg">
            <div className="flex-1 min-h-[400px] bg-[#1E1B4B] rounded-lg mb-4 p-4 overflow-y-auto">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg max-w-[80%] ${msg.type === "user" ? "bg-blue-600 ml-auto" : "bg-[#4A044E]"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} className="flex-1 bg-white/10 p-3 rounded-lg" />
              <button onClick={handleSendMessage} className="p-3 bg-white/10 rounded-lg hover:bg-white/20"><Send className="w-5 h-5 text-white" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AnchorPage;
