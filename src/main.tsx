import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register';
import { store } from './store';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}