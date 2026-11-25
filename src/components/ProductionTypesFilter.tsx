import { type FC, type SyntheticEvent } from 'react';
import { Button } from 'react-bootstrap';

interface IFilterProps {
  minRate: number;
  maxRate: number;
  minBound: number;
  maxBound: number;
  setMinRate: (val: number) => void;
  setMaxRate: (val: number) => void;
  onSearch: (e: SyntheticEvent) => void;
}

export const ProductionTypesFilter: FC<IFilterProps> = ({
  minRate,
  maxRate,
  minBound,
  maxBound,
  setMinRate,
  setMaxRate,
  onSearch,
}) => {
  const handleMinChange = (val: number) => {
    setMinRate(Math.min(val, maxRate));
  };

  const handleMaxChange = (val: number) => {
    setMaxRate(Math.max(val, minRate));
  };

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
            min={minBound}
            max={maxBound}
            value={minRate}
            disabled={minBound === maxBound}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="filter-slider"
          />
          <input
            type="range"
            min={minBound}
            max={maxBound}
            value={maxRate}
            disabled={minBound === maxBound}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
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