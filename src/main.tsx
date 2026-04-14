// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');
console.log('Root element:', root); // <- add this
createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
