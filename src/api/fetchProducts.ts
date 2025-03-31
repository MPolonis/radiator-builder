import { Product } from "../types/Product"

interface LengthData {
  id?: string
  sections?: number
  radiator_length?: number
  price?: number
}

interface HeightData {
  label?: string
  lengths?: Record<string, LengthData>
}

interface DepthData {
  depth?: number
  heights?: Record<string, HeightData>
}

interface FamilyData {
  id?: string
  depths?: Record<string, DepthData>
}

interface ProductData {
  [key: string]: FamilyData
}

const transformLengthToProduct = (
  length: LengthData,
  familyId: string,
  depthMM: number,
  label: string
): Product | null => {
  if (!length.sections || !length.radiator_length || !length.price) {
    return null
  }

  return {
    id: length.id ?? `${familyId}-${depthMM}-${length.sections}`,
    label,
    name: `${label}, ${length.sections} sections`,
    length: length.radiator_length,
    price: length.price,
    sections: length.sections,
    family: familyId,
    image: `/images/emmeline-i-465mm_${length.sections}-sections-preview.jpg`,
  }
}

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/radiator_builder_data.json")
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status}`)
    }

    const data: ProductData = await response.json()
    const products: Product[] = []

    for (const [_, family] of Object.entries(data)) {
      const familyId = family.id ?? "Unknown"
      const depths = family.depths ?? {}

      for (const [_, depth] of Object.entries(depths)) {
        const depthMM = depth.depth ?? 0
        const heights = depth.heights ?? {}

        for (const [_, height] of Object.entries(heights)) {
          const label = height.label ?? ""
          const lengths = height.lengths ?? {}

          for (const [_, length] of Object.entries(lengths)) {
            const product = transformLengthToProduct(length, familyId, depthMM, label)
            if (product) {
              products.push(product)
            }
          }
        }
      }
    }

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export default fetchProducts
