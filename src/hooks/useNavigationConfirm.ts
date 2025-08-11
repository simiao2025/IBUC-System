import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationConfirmProps {
  message?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  shouldConfirm?: boolean;
}

export const useNavigationConfirm = ({ 
  message = 'Você tem certeza que deseja sair desta página?',
  title = 'Confirmar navegação',
  confirmText = 'Sim',
  cancelText = 'Não',
  shouldConfirm = true
}: NavigationConfirmProps = {}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | (() => void) | null>(null);
  const navigate = useNavigate();

  const confirmNavigation = useCallback((destination: string | (() => void)) => {
    try {
      if (!shouldConfirm) {
        // Se não precisa confirmar, executa diretamente
        if (typeof destination === 'string') {
          navigate(destination);
        } else {
          destination();
        }
        return;
      }

      setPendingNavigation(destination);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Erro ao configurar confirmação de navegação:', error);
      // Fallback: executar navegação diretamente
      if (typeof destination === 'string') {
        navigate(destination);
      } else {
        destination();
      }
    }
  }, [navigate, shouldConfirm]);

  const handleConfirm = useCallback(() => {
    try {
      if (pendingNavigation) {
        if (typeof pendingNavigation === 'string') {
          navigate(pendingNavigation);
        } else {
          pendingNavigation();
        }
      }
    } catch (error) {
      console.error('Erro ao executar navegação confirmada:', error);
    } finally {
      setIsDialogOpen(false);
      setPendingNavigation(null);
    }
  }, [pendingNavigation, navigate]);

  const handleCancel = useCallback(() => {
    setIsDialogOpen(false);
    setPendingNavigation(null);
  }, []);

  const showConfirm = useCallback((callback: () => void) => {
    confirmNavigation(callback);
  }, [confirmNavigation]);

  return {
    isDialogOpen,
    confirmNavigation,
    handleConfirm,
    handleCancel,
    showConfirm,
    dialogProps: {
      isOpen: isDialogOpen,
      title,
      message,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      confirmText,
      cancelText
    }
  };
};
