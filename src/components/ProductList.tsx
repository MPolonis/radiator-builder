import { useProductContext } from "../context/ProductContext"
import ProductCard from "./ProductCard"

const ProductList = () => {
  const { filteredProducts, isLoading } = useProductContext()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters to see more results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={`${product.id}`} product={product} />
      ))}
    </div>
  )
}

export default ProductList
