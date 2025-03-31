import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import fetchProducts from '../api/fetchProducts';
import { Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, filteredProducts, setFilteredProducts, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};