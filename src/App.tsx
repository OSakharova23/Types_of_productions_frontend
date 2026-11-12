import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ИСПРАВЛЕНО
import { AppLayout } from './AppLayout';
import { ProductionTypesCatalogPage } from './pages/ProductionTypesCatalogPage';
import { ProductionTypesFeedPage } from './pages/ProductionTypesFeedPage';
import { LoginPage } from './pages/LoginPage.js';
import { ProductionTypesAddPage } from './pages/ProductionTypesAddPage.js';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/production_types" element={<ProductionTypesCatalogPage />} />
          <Route path="/production_types/feed" element={<ProductionTypesFeedPage />} />
          <Route path="/production_types/feed/:id" element={<ProductionTypesFeedPage />} />
          <Route path="/production_types/add" element={<ProductionTypesAddPage />} />
          <Route path="/users/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;