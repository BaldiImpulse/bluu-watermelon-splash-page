
import React from 'react';
import { Input } from '@/components/ui/input';

interface CreditCardFormProps {
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCvv: string;
    cardName: string;
  };
  errors: string[];
  onInputChange: (field: string, value: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ formData, errors, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Dados do Cartão</h4>
      <Input 
        placeholder="Número do cartão" 
        value={formData.cardNumber}
        onChange={(e) => onInputChange('cardNumber', e.target.value)}
        className={errors.includes('Número do cartão') ? 'border-red-500' : ''}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input 
          placeholder="MM/AA" 
          value={formData.cardExpiry}
          onChange={(e) => onInputChange('cardExpiry', e.target.value)}
          className={errors.includes('Validade do cartão') ? 'border-red-500' : ''}
        />
        <Input 
          placeholder="CVV" 
          value={formData.cardCvv}
          onChange={(e) => onInputChange('cardCvv', e.target.value)}
          className={errors.includes('CVV') ? 'border-red-500' : ''}
        />
      </div>
      <Input 
        placeholder="Nome no cartão" 
        value={formData.cardName}
        onChange={(e) => onInputChange('cardName', e.target.value)}
        className={errors.includes('Nome no cartão') ? 'border-red-500' : ''}
      />
    </div>
  );
};

export default CreditCardForm;
