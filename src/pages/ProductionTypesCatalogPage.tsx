import { type FC, type SubmitEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setFilters, fetchProductionTypes } from '../store/slices/productionTypesSlice';
import { ProductionTypesCard } from '../components/ProductionTypesCard';
import { ProductionTypesFilter } from '../components/ProductionTypesFilter';
import { Spinner } from 'react-bootstrap';

export const ProductionTypesCatalogPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { minRate, maxRate, items, loading } = useSelector((state: RootState) => state.productionTypes);

  useEffect(() => {
    dispatch(fetchProductionTypes());
  }, [dispatch]);

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(fetchProductionTypes());
  };

  return (
    <div className="content-area content-area--scroll">
      <ProductionTypesFilter
        minRate={minRate}
        maxRate={maxRate}
        setMinRate={(val) => dispatch(setFilters({ minRate: val, maxRate }))}
        setMaxRate={(val) => dispatch(setFilters({ minRate, maxRate: val }))}
        onSearch={handleSearch as any}
      />
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}><Spinner animation="border" /></div>
      ) : (
        <div className="tile-grid">
          {items.map((item: any) => (
            <ProductionTypesCard key={item.production_id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};