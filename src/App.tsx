import { ProductProvider } from "./context/ProductContext"
import FilterPanel from "./components/FilterPanel"
import ProductList from "./components/ProductList"
import { useTranslation } from "react-i18next"

const App: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductProvider>
        <h1 className="text-3xl font-bold my-10 text-center">{t("title")}</h1>
        <FilterPanel />
        <ProductList />
      </ProductProvider>
    </div>
  )
}

export default App
