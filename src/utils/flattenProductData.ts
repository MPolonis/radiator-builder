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
  if (!length.sections || !length.radiator_length || !length.price) return null

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

const flattenProductData = (data: ProductData): Product[] => {
  return Object.values(data).flatMap((family) => {
    const familyId = family.id ?? "Unknown"

    return Object.values(family.depths ?? {}).flatMap((depth) => {
      const depthMM = depth.depth ?? 0

      return Object.values(depth.heights ?? {}).flatMap((height) => {
        const label = height.label ?? ""

        return Object.values(height.lengths ?? {})
          .map((length) =>
            transformLengthToProduct(length, familyId, depthMM, label)
          )
          .filter((product): product is Product => product !== null)
      })
    })
  })
}

export default flattenProductData
