
import React from 'react';
import { CheckCircle } from 'lucide-react';

const CheckoutGuarantee: React.FC = () => {
  return (
    <div className="text-center text-sm text-gray-600">
      <div className="flex items-center justify-center space-x-1 mb-1">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="font-medium">Garantia de 30 dias ou seu dinheiro de volta</span>
      </div>
      <p>Compra 100% segura e protegida</p>
    </div>
  );
};

export default CheckoutGuarantee;
