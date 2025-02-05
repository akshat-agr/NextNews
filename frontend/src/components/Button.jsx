import React from "react";

const Button = ({text,outlined}) => {
  return (
    <button
      className={`px-6 py-3 rounded-3xl font-semibold transition-all duration-300
            ${
              outlined
                ? "cursor-pointer border border-white text-white bg-transparent hover:bg-white hover:text-black"
                : "cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-500"
            }`}
    >
      {text}
    </button>
  );
};

export default Button;
