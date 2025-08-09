import React, { ReactNode } from 'react';
import { useNavigationConfirm } from '../../hooks/useNavigationConfirm';
import ConfirmDialog from './ConfirmDialog';

interface ConfirmLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmLink: React.FC<ConfirmLinkProps> = ({
  to,
  children,
  className,
  onClick,
  title = 'Confirmar navegação',
  message = 'Você tem certeza que deseja sair desta página?',
  confirmText = 'Sim',
  cancelText = 'Não'
}) => {
  const { isDialogOpen, confirmNavigation, handleConfirm, handleCancel } = useNavigationConfirm({
    title,
    message
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    confirmNavigation(() => {
      if (onClick) {
        onClick();
      } else {
        window.location.href = to;
      }
    });
  };

  return (
    <>
      <a href={to} className={className} onClick={handleClick}>
        {children}
      </a>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    </>
  );
};

export default ConfirmLink;
