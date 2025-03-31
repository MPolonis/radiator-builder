import { useProductContext } from "../context/ProductContext"
import ProductCard from "./ProductCard"

const ProductList = () => {
  const { filteredProducts } = useProductContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={`${product.id}`} product={product} />
      ))}
    </div>
  )
}

export default ProductList
