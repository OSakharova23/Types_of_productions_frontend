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
          <Route path="/" element={<ProductionTypesCatalogPage />} />
          <Route path="/feed" element={<ProductionTypesFeedPage />} />
          <Route path="/feed/:id" element={<ProductionTypesFeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add" element={<ProductionTypesAddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;