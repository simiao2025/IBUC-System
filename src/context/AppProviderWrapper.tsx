import React, { ReactNode } from 'react';
import { SupabaseProvider, useSupabase } from './SupabaseContext';

// Adaptador para manter compatibilidade com o contexto original
const SupabaseContextAdapter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const supabaseContext = useSupabase();

  // Converter para o formato do contexto original (AppContext)
  const adaptedContext = {
    // Student registration
    currentStudent: null,
    setCurrentStudent: () => {},
    
    // Students database
    students: supabaseContext.students,
    addStudent: supabaseContext.addStudent,
    
    // Enrollments
    enrollments: supabaseContext.enrollments,
    addEnrollment: supabaseContext.addEnrollment,
    
    // Polos
    polos: supabaseContext.polos,
    addPolo: supabaseContext.addPolo,
    updatePolo: supabaseContext.updatePolo,
    deletePolo: supabaseContext.deletePolo,
    
    // Authentication
    currentUser: supabaseContext.currentUser,
    login: supabaseContext.login,
    logout: supabaseContext.logout,

    // Admin access control
    hasAccessToAllPolos: supabaseContext.hasAccessToAllPolos,
    hasAccessToPolo: supabaseContext.hasAccessToPolo,
    getCurrentUserAccessLevel: supabaseContext.getCurrentUserAccessLevel,
    getUserAllowedPolos: supabaseContext.getUserAllowedPolos,

    // Additional properties for compatibility
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {}
  };

  return (
    <OriginalAppContext.Provider value={adaptedContext}>
      {children}
    </OriginalAppContext.Provider>
  );
};

// Importar o contexto original para manter compatibilidade
// (será substituído pelo novo contexto)
const OriginalAppContext = React.createContext<any>({});

// Hook para usar o contexto original (mantém compatibilidade)
export const useApp = () => {
  return React.useContext(OriginalAppContext);
};

// Provider principal que usa Supabase
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SupabaseProvider>
      <SupabaseContextAdapter>
        {children}
      </SupabaseContextAdapter>
    </SupabaseProvider>
  );
};