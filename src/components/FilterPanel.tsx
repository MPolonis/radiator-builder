import { useForm } from "react-hook-form"
import { useProductContext } from "../context/ProductContext"
import { useTranslation } from "react-i18next"
import Input from "./common/Input"

export interface FilterFormData {
  family: string
  minLength: string
  maxLength: string
}

const FilterPanel = () => {
  const { products, clearProducts, filterProducts } = useProductContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    defaultValues: {
      family: "",
      minLength: "",
      maxLength: "",
    },
  })
  const { t } = useTranslation()

  const onSubmit = (data: FilterFormData) => filterProducts(data)

  const handleClear = () => {
    reset()
    clearProducts()
  }

  const uniqueFamilies = Array.from(new Set(products.map((p) => p.family)))

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-sm mb-1">{t("filter.radiatorFamily")}</label>
          <select
            className="border rounded px-3 py-2 appearance-none bg-white cursor-pointer"
            {...register("family")}
          >
            <option value="">{t("filter.all")}</option>
            {uniqueFamilies.map((f) => (
              <option key={f} value={f}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Input
          label={t("filter.lengthFrom")}
          type="number"
          placeholder="0"
          error={errors.minLength?.message}
          {...register("minLength", {
            min: { value: 0, message: t("validation.minLength") },
            pattern: { value: /^[0-9]*$/, message: t("validation.minLength") },
          })}
        />

        <Input
          label={t("filter.lengthTo")}
          type="number"
          placeholder="1000"
          error={errors.maxLength?.message}
          {...register("maxLength", {
            min: { value: 0, message: t("validation.maxLength") },
            pattern: { value: /^[0-9]*$/, message: t("validation.maxLength") },
          })}
        />

        <div className="flex gap-2">
          <button
            type="button"
            className="w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleClear}
          >
            {t("filter.button.clear")}
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {t("filter.button.search")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterPanel
