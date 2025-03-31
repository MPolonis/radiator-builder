import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react"
import fetchProducts from "../services/productService"
import { Product } from "../types/Product"
import { FilterFormData } from "../components/FilterPanel"

interface ProductContextType {
  products: Product[]
  filteredProducts: Product[]
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>
  filterProducts: (data: FilterFormData) => void
  clearProducts: () => void
  isLoading: boolean
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filterProducts = useCallback((data: FilterFormData) => {
    const filtered = products.filter((product) => {
      const matchesFamily = data.family ? product.family === data.family : true
      const matchesLength =
        (!data.minLength || product.length >= Number(data.minLength)) &&
        (!data.maxLength || product.length <= Number(data.maxLength))

      return matchesFamily && matchesLength
    })

    setFilteredProducts(filtered)
  }, [products])

  const clearProducts = () => setFilteredProducts(products)

  const loadProducts = async () => {
    try {
      const data = await fetchProducts()

      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error in loadProducts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        isLoading,
        filterProducts,
        clearProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context)
    throw new Error("useProductContext must be used within a ProductProvider")
  return context
}
