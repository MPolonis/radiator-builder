import { Product } from "../types/Product"
import { useTranslation } from "react-i18next"
interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="bg-white shadow-md rounded flex flex-col justify-center items-center h-[300px]">
      <div className="relative w-full h-[150px] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-auto h-auto max-w-full max-h-[120px] object-contain p-2"
        />
      </div>
      <div className="flex flex-col justify-start items-start p-4">
        <h3 className="font-semibold my-2 ">{product.name}</h3>
        <p className="text-sm">
          {t("productCard.length")}: {product.length}mm
        </p>
        <p className="text-sm mt-1">
          {t("productCard.price")}: £{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
