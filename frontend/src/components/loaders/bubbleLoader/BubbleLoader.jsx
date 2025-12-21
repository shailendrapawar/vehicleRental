
import React from "react";

const BubbleLoader = ({ size = 12, color = "blue-500", className = "" }) => {
  const bubbles = Array.from({ length: 3 });

  return (
    <div className={`flex gap-2 px-2 py-2 justify-center items-center ${className}`}>
      {bubbles.map((_, i) => (
        <span
          key={i}
          className={`w-${size} h-${size} bg-${color} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default BubbleLoader;