import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/30 shadow-lg p-6 rounded-2xl text-center transition-transform transform hover:scale-105 hover:border-white/50 hover:shadow-2xl">
      <div className="text-5xl mb-4 text-blue-400">{icon}</div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-white/70 mt-2 text-lg">{description}</p>
    </div>
  );
};

export default Card;
