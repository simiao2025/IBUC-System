import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import DatabaseSetup from './DatabaseSetup';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

const AppWithDatabase: React.FC = () => {
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      setIsChecking(true);
      
      // Verificar se as tabelas existem
      const { data, error } = await supabase
        .from('system_settings')
        .select('key')
        .limit(1);

      if (error) {
        console.log('Database not configured:', error.message);
        setNeedsSetup(true);
        return;
      }

      // Se llegamos até aqui, o banco está configurado
      console.log('Database is configured');
      setNeedsSetup(false);
      
    } catch (err) {
      console.error('Error checking database:', err);
      setNeedsSetup(true);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSetupComplete = () => {
    setNeedsSetup(false);
  };

  // Loading state
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verificando configuração do banco de dados...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto verificamos o status da conexão com o Supabase.
          </p>
        </div>
      </div>
    );
  }

  // Show database setup if needed
  if (needsSetup) {
    return <DatabaseSetup onComplete={handleSetupComplete} />;
  }

  // Show the main app
  return <RouterProvider router={router} />;
};

export default AppWithDatabase;