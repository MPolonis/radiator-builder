import { Product } from "../types/Product"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  console.log(product)
  return (
    <div className="bg-white shadow-md rounded flex flex-col justify-center items-center h-[300px]">
      <img
        src={product.image}
        alt={product.name}
        className="max-w-44 max-h-44"
      />
      <div className="flex flex-col justify-start items-start p-4">
        <h3 className="font-semibold my-2 ">{product.name}</h3>
        <p className="text-sm">Length: {product.length}mm</p>
        <p className="text-sm mt-1">Price from: £{product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard
