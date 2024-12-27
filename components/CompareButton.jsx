import React from 'react';

export default function CompareButton({ compareCount, goToComparePage }) {
  return (
    <div className="absolute top-6 right-6 animate__animated animate__fadeIn animate__delay-1s">
      <button
        className="py-2 px-4 bg-green-600 text-white rounded-lg relative overflow-hidden"
        onClick={goToComparePage}
      >
        Go to Compare
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1">
          {compareCount}
        </span>
      </button>
    </div>
  );
}
