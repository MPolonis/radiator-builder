import { useMemo } from "react"
import { useProductContext } from "../context/ProductContext"
import ProductCard from "./ProductCard"
import { useTranslation } from "react-i18next"
const ProductList = () => {
  const { filteredProducts, isLoading } = useProductContext()
  const { t } = useTranslation()

  const products = useMemo(() => filteredProducts, [filteredProducts])

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
          <h3 className="text-lg font-semibold text-gray-900">
            {t("emptyState.title")}
          </h3>
          <p className="mt-2 text-gray-500">
            {t("emptyState.description")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={`${product.id}`} product={product} />
      ))}
    </div>
  )
}

export default ProductList
