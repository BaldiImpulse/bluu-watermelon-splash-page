
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
  };
  errors: string[];
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, errors, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center">
        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
        Dados Pessoais
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input 
          placeholder="Nome completo" 
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className={errors.includes('Nome completo') ? 'border-red-500' : ''}
        />
        <Input 
          placeholder="Telefone" 
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          className={errors.includes('Telefone') ? 'border-red-500' : ''}
        />
      </div>
      <Input 
        placeholder="E-mail" 
        type="email" 
        value={formData.email}
        onChange={(e) => onInputChange('email', e.target.value)}
        className={errors.includes('E-mail') ? 'border-red-500' : ''}
      />
    </div>
  );
};

export default PersonalInfoForm;
