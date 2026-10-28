import { type FC, type FormEvent } from 'react';
import { Button } from 'react-bootstrap';

interface IFilterProps {
  minRate: number;
  maxRate: number;
  setMinRate: (val: number) => void;
  setMaxRate: (val: number) => void;
  onSearch: (e: FormEvent) => void;
}

export const ProductionTypesFilter: FC<IFilterProps> = ({
  minRate,
  maxRate,
  setMinRate,
  setMaxRate,
  onSearch,
}) => {
  return (
    <form onSubmit={onSearch} className="filter-form">
      <div className="filter-slider-box">
        <div className="filter-slider-header">
          <span className="filter-slider-label">Норма выхода:</span>
          <span className="filter-slider-value">
            {minRate} - {maxRate} шт
          </span>
        </div>

        <div className="range-slider-wrapper">
          <div className="range-slider-track"></div>
          <input
            type="range"
            min="0"
            max="200"
            value={minRate}
            onChange={(e) => setMinRate(Number(e.target.value))}
            className="filter-slider"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={maxRate}
            onChange={(e) => setMaxRate(Number(e.target.value))}
            className="filter-slider"
          />
        </div>
      </div>
      <Button 
        variant="light" 
        type="submit" 
        style={{ marginTop: '14px', borderRadius: '0', fontSize: '12px', fontWeight: 500 }}
      >
        НАЙТИ
      </Button>
    </form>
  );
};