
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CheckoutHeader from './checkout/CheckoutHeader';
import TrustIndicators from './checkout/TrustIndicators';
import OrderSummary from './checkout/OrderSummary';
import PersonalInfoForm from './checkout/PersonalInfoForm';
import AddressForm from './checkout/AddressForm';
import PaymentMethodSelector from './checkout/PaymentMethodSelector';
import CreditCardForm from './checkout/CreditCardForm';
import SecurityBadge from './checkout/SecurityBadge';
import PixConfirmationModal from './checkout/PixConfirmationModal';
import ValidationErrors from './checkout/ValidationErrors';
import CheckoutGuarantee from './checkout/CheckoutGuarantee';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  shipping: number;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, cartItems, total, shipping }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [showPixConfirmation, setShowPixConfirmation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  // Form fields state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      { field: 'name', label: 'Nome completo' },
      { field: 'phone', label: 'Telefone' },
      { field: 'email', label: 'E-mail' },
      { field: 'cep', label: 'CEP' },
      { field: 'address', label: 'Endereço' },
      { field: 'number', label: 'Número' },
      { field: 'city', label: 'Cidade' },
      { field: 'state', label: 'Estado' }
    ];

    if (paymentMethod === 'credit') {
      requiredFields.push(
        { field: 'cardNumber', label: 'Número do cartão' },
        { field: 'cardExpiry', label: 'Validade do cartão' },
        { field: 'cardCvv', label: 'CVV' },
        { field: 'cardName', label: 'Nome no cartão' }
      );
    }

    const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData].trim());
    
    if (missingFields.length > 0) {
      setErrors(missingFields.map(({ label }) => label));
      return false;
    }

    return true;
  };

  const handlePixGeneration = () => {
    if (!validateForm()) {
      return;
    }
    setShowPixConfirmation(true);
  };

  const confirmPixPayment = () => {
    setShowPixConfirmation(false);
    window.location.href = '/obrigado';
  };

  const handleFinalizarPedido = () => {
    if (!validateForm()) {
      return;
    }
    window.location.href = '/obrigado';
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <CheckoutHeader onClose={onClose} />
          
          <div className="space-y-6">
            <ValidationErrors errors={errors} />
            
            <TrustIndicators />
            
            <OrderSummary cartItems={cartItems} total={total} />

            <PersonalInfoForm 
              formData={{
                name: formData.name,
                phone: formData.phone,
                email: formData.email
              }}
              errors={errors}
              onInputChange={handleInputChange}
            />

            <AddressForm 
              formData={{
                cep: formData.cep,
                address: formData.address,
                number: formData.number,
                complement: formData.complement,
                city: formData.city,
                state: formData.state
              }}
              errors={errors}
              onInputChange={handleInputChange}
            />

            <PaymentMethodSelector 
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />

            {paymentMethod === 'credit' && (
              <CreditCardForm 
                formData={{
                  cardNumber: formData.cardNumber,
                  cardExpiry: formData.cardExpiry,
                  cardCvv: formData.cardCvv,
                  cardName: formData.cardName
                }}
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}

            <SecurityBadge />

            <Button 
              onClick={paymentMethod === 'pix' ? handlePixGeneration : handleFinalizarPedido}
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3"
            >
              {paymentMethod === 'pix' ? 'GERAR PIX' : 'FINALIZAR PEDIDO'}
            </Button>

            <CheckoutGuarantee />
          </div>
        </DialogContent>
      </Dialog>

      <PixConfirmationModal 
        isOpen={showPixConfirmation}
        onClose={() => setShowPixConfirmation(false)}
        total={total}
        onConfirm={confirmPixPayment}
      />
    </>
  );
};

export default Checkout;
