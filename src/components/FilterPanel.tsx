import { useForm } from 'react-hook-form';
import { useProductContext } from '../context/ProductContext';

interface FilterFormData {
  family: string;
  minLength: string;
  maxLength: string;
}

const FilterPanel = () => {
  const { products, setFilteredProducts } = useProductContext();
  const { register, handleSubmit, reset } = useForm<FilterFormData>({
    defaultValues: {
      family: '',
      minLength: '',
      maxLength: '',
    },
  });

  const onSubmit = (data: FilterFormData) => {
    const filtered = products.filter(product => {
      const matchesFamily = data.family ? product.family === data.family : true;
      const matchesLength =
        (!data.minLength || product.length >= Number(data.minLength)) &&
        (!data.maxLength || product.length <= Number(data.maxLength));
      return matchesFamily && matchesLength;
    });
    setFilteredProducts(filtered);
  };

  const handleClear = () => {
    reset();
    setFilteredProducts(products);
  };

  const uniqueFamilies = Array.from(new Set(products.map(p => p.family)));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-sm mb-1">Radiator family</label>
          <select
            className="border rounded px-3 py-2"
            {...register('family')}
          >
            <option value="">All</option>
            {uniqueFamilies.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Length from (mm)</label>
          <input
            type="number"
            className="border rounded px-3 py-2"
            {...register('minLength', {
              min: { value: 0, message: 'Minimum length must be 0 or greater' }
            })}
            placeholder="0"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Length to (mm)</label>
          <input
            type="number"
            className="border rounded px-3 py-2"
            {...register('maxLength', {
              min: { value: 0, message: 'Maximum length must be 0 or greater' }
            })}
            placeholder="1000"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;