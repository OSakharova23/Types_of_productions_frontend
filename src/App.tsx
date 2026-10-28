import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { ProductionTypesCatalogPage } from './pages/ProductionTypesCatalogPage';
import { ProductionTypesFeedPage } from './pages/ProductionTypesFeedPage';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<ProductionTypesCatalogPage />} />
          <Route path="/feed" element={<ProductionTypesFeedPage />} />
          <Route path="/feed/:id" element={<ProductionTypesFeedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;