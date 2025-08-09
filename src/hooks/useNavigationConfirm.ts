import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationConfirmProps {
  message?: string;
  title?: string;
}

export const useNavigationConfirm = ({ 
  message = 'Você tem certeza que deseja sair desta página?',
  title = 'Confirmar navegação'
}: NavigationConfirmProps = {}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | (() => void) | null>(null);
  const navigate = useNavigate();

  const confirmNavigation = useCallback((destination: string | (() => void)) => {
    setPendingNavigation(destination);
    setIsDialogOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (pendingNavigation) {
      if (typeof pendingNavigation === 'string') {
        navigate(pendingNavigation);
      } else {
        pendingNavigation();
      }
    }
    setIsDialogOpen(false);
    setPendingNavigation(null);
  }, [pendingNavigation, navigate]);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
    setPendingNavigation(null);
  }, []);

  return {
    isDialogOpen,
    confirmNavigation,
    handleConfirm,
    handleCancel,
    dialogProps: {
      title,
      message
    }
  };
};
