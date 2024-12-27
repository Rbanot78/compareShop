import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router

export default function Compare() {
  const [compareList, setCompareList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    // Get the list of selected products from localStorage
    const savedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
    setCompareList(savedCompareList);
  }, []);

  // Function to remove product from comparison list
  const removeFromCompare = () => {
    const updatedCompareList = compareList.filter((product) => product.id !== productToRemove.id);
    setCompareList(updatedCompareList);
    localStorage.setItem('compareList', JSON.stringify(updatedCompareList)); // Save to localStorage
    setShowConfirmation(false); // Close confirmation modal
  };

  const handleRemoveClick = (product) => {
    setProductToRemove(product); // Set the product to be removed
    setShowConfirmation(true);  // Show confirmation modal
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Close confirmation modal without removing
  };

  const goHome = () => {
    router.push('/'); // Redirect to home page in Next.js using useRouter
  };

  return (
    <div className="container mx-auto p-6">
      {/* Home Button */}
      <button
        onClick={goHome}
        className="absolute top-6 left-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all z-10"
      >
        Home
      </button>

      <h1 className="text-5xl font-extrabold text-center mb-12">Compare Products</h1>

      {/* Check if the user has selected products for comparison */}
      {compareList.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No products selected for comparison</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Product</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 text-left">{product.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Image Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Image</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    <div className="flex item-center">
                      <img
                        src={product.selectedImage || product.images[0]}
                        alt={product.title}
                        className="w-32 h-32 object-contain rounded-md"
                      />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Product Brand */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Brand</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.brand}</td>
                ))}
              </tr>

              {/* Price Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Price</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">${product.price}</td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.rating}</td>
                ))}
              </tr>

              {/* Weight Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Weight</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.weight}g</td>
                ))}
              </tr>

              {/* Dimensions Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Dimensions</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm
                  </td>
                ))}
              </tr>

              {/* Stock Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Stock</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.stock}</td>
                ))}
              </tr>

              {/* Warranty Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Warranty</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.warrantyInformation}</td>
                ))}
              </tr>

              {/* Shipping Info Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Shipping Info</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">{product.shippingInformation}</td>
                ))}
              </tr>

              {/* Reviews Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Reviews</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    {product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div key={index} className="text-sm text-gray-600 mb-1">
                          <div className="text-gray-500">
                            {review.reviewerName} ({new Date(review.date).toLocaleDateString()})
                          </div>
                          <div className="text-yellow-500">{'★'.repeat(review.rating)}</div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews yet</p>
                    )}
                  </td>
                ))}
              </tr>

              {/* Remove Button Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">Remove</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4">
                    <button
                      onClick={() => handleRemoveClick(product)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Are you sure you want to remove this product?</h2>
            <div className="flex justify-between">
              <button
                onClick={removeFromCompare}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
