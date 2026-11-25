import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { ProductionTypesCatalogPage } from './pages/ProductionTypesCatalogPage';
import { ProductionTypesFeedPage } from './pages/ProductionTypesFeedPage';
import { LoginPage } from './pages/LoginPage.js';
import { ProductionTypesAddPage } from './pages/ProductionTypesAddPage.js';

const basename = import.meta.env.BASE_URL || '/';

export const App: FC = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ProductionTypesCatalogPage />} />
          <Route path="/production_types" element={<ProductionTypesCatalogPage />} />
          <Route path="/production_types/feed" element={<ProductionTypesFeedPage />} />
          <Route path="/production_types/feed/:id" element={<ProductionTypesFeedPage />} />
          <Route path="/production_types/add" element={<ProductionTypesAddPage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="*" element={<ProductionTypesCatalogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;