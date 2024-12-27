import React, { useState } from 'react';

export default function ProductCard({
  product,
  compareList,
  handleThumbnailClick,
  handleCompareClick,
}) {
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description;

  return (
    <div className="border p-6 rounded-lg shadow-xl bg-white transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 animate__animated animate__fadeInUp">
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 overflow-hidden relative">
            <img
              src={product.selectedImage || product.images[0]}
              alt={product.title}
              className="object-contain w-full h-full transition-transform transform hover:scale-110 ease-in-out duration-300"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="w-12 sm:w-16 h-12 sm:h-16 cursor-pointer transform transition-transform duration-200 hover:scale-110"
              onClick={() => handleThumbnailClick(product.id, image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-full h-full object-contain rounded-lg ${product.selectedImage === image ? 'border-2 border-indigo-500' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2 animate__animated animate__fadeIn animate__delay-1s">{product.title}</h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg animate__animated animate__fadeIn animate__delay-1.2s">
        {isExpanded ? product.description : truncatedDescription}
      </p>
      <button
        className="text-indigo-600 mt-2 text-sm"
        onClick={toggleDescription}
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
      <p className="mt-4 text-lg sm:text-xl font-bold animate__animated animate__fadeIn animate__delay-1.4s">${product.price}</p>
      <p className="text-gray-500 animate__animated animate__fadeIn animate__delay-1.6s">Rating: {product.rating}</p>

      <button
        className={`mt-4 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${compareList.some((p) => p.id === product.id) ? 'bg-red-600' : 'bg-indigo-600'} text-white`}
        onClick={() => handleCompareClick(product)}
      >
        {compareList.some((p) => p.id === product.id) ? 'Remove' : 'Compare'}
      </button>
    </div>
  );
}
