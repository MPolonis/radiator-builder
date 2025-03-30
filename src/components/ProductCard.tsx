import { Product } from '../types/Product';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => (
  <div className="bg-white shadow-md rounded p-4 flex flex-col items-center text-center">
    <h3 className="font-semibold mb-1">{product.name}</h3>
    <p className="text-sm">Length: {product.length}mm</p>
    <p className="text-sm mt-1">Price from: £{product.price.toFixed(2)}</p>
  </div>
);

export default ProductCard;