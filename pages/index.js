import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'animate.css';

import ProductCard from '@/components/ProductCard';
import CategoryDropdown from '@/components/CategoryDropdown';
import CompareButton from '@/components/CompareButton';

export default function Home({ categories, initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('smartphones');
  const [compareList, setCompareList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCompareList = JSON.parse(localStorage.getItem('compareList')) || [];
      setCompareList(savedCompareList);
    }
  }, []);

  const handleThumbnailClick = (productId, image) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, selectedImage: image } : product
      )
    );
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    setProducts(response.data.products);
  };

  const handleCompareClick = (product) => {
    let updatedCompareList = [...compareList];
    if (updatedCompareList.some((p) => p.id === product.id)) {
      updatedCompareList = updatedCompareList.filter((p) => p.id !== product.id);
    } else {
      if (updatedCompareList.length < 3) {
        updatedCompareList.push(product);
      } else {
        alert('You can compare up to 3 products only!');
      }
    }
    setCompareList(updatedCompareList);
    if (typeof window !== 'undefined') {
      localStorage.setItem('compareList', JSON.stringify(updatedCompareList));
    }
  };

  const goToComparePage = () => {
    router.push('/compare');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 animate__animated animate__fadeIn">
        Product Showcase
      </h1>

      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            compareList={compareList}
            handleThumbnailClick={handleThumbnailClick}
            handleCompareClick={handleCompareClick}
          />
        ))}
      </div>

      <CompareButton compareCount={compareList.length} goToComparePage={goToComparePage} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const allowedCategories = [
      'fragrances',
      'laptops',
      'motorcycle',
      'smartphones',
      'sunglasses',
      'tablets',
      'vehicle',
    ];

    const categoriesResponse = await axios.get('https://dummyjson.com/products/category-list');
    const categories = categoriesResponse.data.filter((category) =>
      allowedCategories.includes(category)
    );

    const productsResponse = await axios.get('https://dummyjson.com/products/category/smartphones');
    const initialProducts = productsResponse.data.products.map((product) => ({
      ...product,
      selectedImage: product.images[0],
    }));

    return {
      props: {
        categories,
        initialProducts,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        categories: [],
        initialProducts: [],
      },
    };
  }
}
