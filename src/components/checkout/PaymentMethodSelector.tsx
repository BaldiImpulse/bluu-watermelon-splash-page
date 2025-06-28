
import React from 'react';
import { CheckCircle, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  paymentMethod, 
  onPaymentMethodChange 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
        Forma de Pagamento
      </h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <input 
            type="radio" 
            name="payment" 
            value="credit" 
            className="text-[#D1447D]" 
            checked={paymentMethod === 'credit'}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
          />
          <CreditCard className="w-4 h-4" />
          <span>Cartão de Crédito</span>
          <Badge className="ml-auto bg-green-100 text-green-800">Mais Popular</Badge>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
          <input 
            type="radio" 
            name="payment" 
            value="pix" 
            className="text-[#D1447D]"
            checked={paymentMethod === 'pix'}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
          />
          <span className="text-lg">💳</span>
          <span>PIX</span>
          <Badge className="ml-auto bg-blue-100 text-blue-800">Instantâneo</Badge>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
