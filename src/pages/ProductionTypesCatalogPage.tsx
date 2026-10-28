import { type FC, type SyntheticEvent, useState } from 'react';
import { PRODUCTION_TYPES_MOCK, type IProductionType } from '../modules/production_types_mock';
import { ProductionTypesCard } from '../components/ProductionTypesCard';
import { ProductionTypesFilter } from '../components/ProductionTypesFilter';

export const ProductionTypesCatalogPage: FC = () => {
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(200);

  const [production_types_list, setProductionTypesList] = useState<IProductionType[]>(
    PRODUCTION_TYPES_MOCK.filter(item => item.status === 'published')
  );

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    
    let currentMin = minRate;
    let currentMax = maxRate;
    if (currentMin > currentMax) {
      currentMin = maxRate;
      currentMax = minRate;
      setMinRate(currentMin);
      setMaxRate(currentMax);
    }

    const filteredList = PRODUCTION_TYPES_MOCK.filter(item => {
      if (item.status !== 'published') return false;

      const rate = item.production_output_rate || 0;
      return rate >= currentMin && rate <= currentMax;
    });
    setProductionTypesList(filteredList);
  };

  return (
    <div className="content-area content-area--scroll">
      <ProductionTypesFilter
        minRate={minRate}
        maxRate={maxRate}
        setMinRate={setMinRate}
        setMaxRate={setMaxRate}
        onSearch={handleSearch}
      />

      <div className="tile-grid">
        {production_types_list.map((item) => (
          <ProductionTypesCard key={item.production_id} item={item} />
        ))}
      </div>
    </div>
  );
};