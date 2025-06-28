
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AddressFormProps {
  formData: {
    cep: string;
    address: string;
    number: string;
    complement: string;
    city: string;
    state: string;
  };
  errors: string[];
  onInputChange: (field: string, value: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, errors, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
        Endereço de Entrega
      </h3>
      <Input 
        placeholder="CEP" 
        value={formData.cep}
        onChange={(e) => onInputChange('cep', e.target.value)}
        className={errors.includes('CEP') ? 'border-red-500' : ''}
      />
      <Input 
        placeholder="Endereço" 
        value={formData.address}
        onChange={(e) => onInputChange('address', e.target.value)}
        className={errors.includes('Endereço') ? 'border-red-500' : ''}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          placeholder="Número" 
          value={formData.number}
          onChange={(e) => onInputChange('number', e.target.value)}
          className={errors.includes('Número') ? 'border-red-500' : ''}
        />
        <Input 
          placeholder="Complemento" 
          value={formData.complement}
          onChange={(e) => onInputChange('complement', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          placeholder="Cidade" 
          value={formData.city}
          onChange={(e) => onInputChange('city', e.target.value)}
          className={errors.includes('Cidade') ? 'border-red-500' : ''}
        />
        <Input 
          placeholder="Estado" 
          value={formData.state}
          onChange={(e) => onInputChange('state', e.target.value)}
          className={errors.includes('Estado') ? 'border-red-500' : ''}
        />
      </div>
    </div>
  );
};

export default AddressForm;
