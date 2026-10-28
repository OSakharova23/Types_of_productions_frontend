import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ProductionTypesTabBar } from './components/ProductionTypesTabBar';

export const AppLayout: FC = () => {
  return (
    <div className="mobile-viewport">
      <Outlet />
      <ProductionTypesTabBar />
    </div>
  );
};