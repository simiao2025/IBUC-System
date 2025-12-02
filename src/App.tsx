import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { SupabaseProvider } from './context/SupabaseContext';
import { router } from './router';

function App() {
  return (
    <SupabaseProvider>
      <RouterProvider router={router} />
    </SupabaseProvider>
  );
}

export default App;