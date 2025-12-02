import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { SupabaseProvider } from './context/SupabaseContext';
import { router } from './router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <SupabaseProvider>
        <RouterProvider router={router} />
      </SupabaseProvider>
    </ErrorBoundary>
  );
}

export default App;