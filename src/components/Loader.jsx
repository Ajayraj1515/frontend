import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-3">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-[bounce_1.5s_ease-in-out_infinite]" style={{ animationDelay: "0s" }}></span>
          <span className="w-4 h-4 bg-purple-500 rounded-full animate-[bounce_1.5s_ease-in-out_infinite]" style={{ animationDelay: "0.15s" }}></span>
          <span className="w-4 h-4 bg-pink-500 rounded-full animate-[bounce_1.5s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }}></span>
        </div>
        <p className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
