import { Product } from "../types/Product"
import flattenProductData from "../utils/flattenProductData"

const DATA_FILE_PATH = "/radiator_builder_data.json"

interface ProductData {
  [key: string]: any
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(DATA_FILE_PATH)

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status}`)
    }

    const data: ProductData = await response.json()
    return flattenProductData(data)
  } catch (error) {
    console.error("Error in fetchProducts:", error)
    throw error
  }
}

export default fetchProducts
