"use client";

import Image from "next/image";
import { useState } from "react";

export default function Carousel({ images, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  return (
    <div className={`mt-4 ${className}`}>
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Main Image Container */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Image
                  src={image.src}
                  width={image.width || 800}
                  height={image.height || 600}
                  className="w-full h-auto object-cover rounded-lg"
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
            currentIndex === 0 
              ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
              : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === images.length - 1}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
            currentIndex === images.length - 1 
              ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
              : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
}
