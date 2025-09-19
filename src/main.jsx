import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import ListingsPage from './features/listings/pages/ListingsPage.jsx';
import RoomDetailPage from './features/listings/pages/RoomDetailPage.jsx';

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* App is your layout; it must render <Outlet /> inside */}
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="listings" replace />} />  {/* redirect / → /listings */}
            <Route path="listings" element={<ListingsPage />} />
            <Route path="rooms/:id" element={<RoomDetailPage />} />
            <Route path="*" element={<Navigate to="/listings" replace />} />  {/* catch all */}
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
});
