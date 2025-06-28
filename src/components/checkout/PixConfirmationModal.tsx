
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PixConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onConfirm: () => void;
}

const PixConfirmationModal: React.FC<PixConfirmationModalProps> = ({
  isOpen,
  onClose,
  total,
  onConfirm
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmação do PIX</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <div className="text-4xl">💳</div>
          <p className="text-gray-600">
            Você está prestes a gerar um código PIX no valor de <strong>R$ {total.toFixed(2)}</strong>
          </p>
          <p className="text-sm text-gray-500">
            O código PIX terá validade de 15 minutos
          </p>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-[#D1447D] hover:bg-[#B13A6B]"
              onClick={onConfirm}
            >
              Confirmar PIX
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PixConfirmationModal;
