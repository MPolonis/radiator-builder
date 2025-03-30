import { ProductProvider } from './context/ProductContext';
import FilterPanel from './components/FilterPanel';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductProvider>
        <h1 className="text-3xl font-bold my-10 text-center">
          Radiator Builder
        </h1>
        <FilterPanel />
        <ProductList />
      </ProductProvider>
    </div>
  )
}

export default App
