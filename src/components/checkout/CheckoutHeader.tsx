
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CheckoutHeaderProps {
  onClose: () => void;
}

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onClose }) => {
  return (
    <DialogHeader>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <DialogTitle className="text-lg font-bold">
          Finalizar Compra
        </DialogTitle>
      </div>
    </DialogHeader>
  );
};

export default CheckoutHeader;
