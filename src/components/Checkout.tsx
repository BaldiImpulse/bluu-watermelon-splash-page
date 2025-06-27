
import React, { useState } from 'react';
import { CreditCard, X, Shield, Truck, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, cartItems, total }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [showPixConfirmation, setShowPixConfirmation] = useState(false);

  const handlePixPayment = () => {
    setShowPixConfirmation(true);
  };

  const confirmPixPayment = () => {
    // Aqui seria a lógica para processar o PIX
    console.log('Processando pagamento PIX...');
    setShowPixConfirmation(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-lg font-bold">Finalizar Compra</span>
            </DialogTitle>
            <DialogDescription>
              Complete seus dados para finalizar a compra com segurança
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Compra 100% Segura e Protegida</span>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span className="text-sm">{item.name} x{item.quantity}</span>
                  <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Frete e Taxas</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-[#D1447D]">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center p-2">
                <Truck className="w-6 h-6 text-[#D1447D] mb-1" />
                <span className="text-xs text-gray-600">Frete Grátis</span>
              </div>
              <div className="flex flex-col items-center p-2">
                <Clock className="w-6 h-6 text-[#D1447D] mb-1" />
                <span className="text-xs text-gray-600">Entrega Rápida</span>
              </div>
              <div className="flex flex-col items-center p-2">
                <Shield className="w-6 h-6 text-[#D1447D] mb-1" />
                <span className="text-xs text-gray-600">100% Seguro</span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Nome completo *" required />
                <Input placeholder="Telefone *" required />
              </div>
              <Input placeholder="E-mail *" type="email" required />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Endereço de Entrega
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="CEP *" required />
                <Input placeholder="Cidade *" required />
              </div>
              <Input placeholder="Endereço completo *" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Número *" required />
                <Input placeholder="Complemento" />
              </div>
              <Input placeholder="Estado *" required />
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Forma de Pagamento
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="credit" 
                    className="text-[#D1447D]" 
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <span className="font-medium">Cartão de Crédito</span>
                    <p className="text-xs text-gray-500">Parcele em até 12x sem juros</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="pix" 
                    className="text-[#D1447D]"
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-lg">💳</span>
                  <div>
                    <span className="font-medium">PIX</span>
                    <p className="text-xs text-gray-500">Aprovação instantânea</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit' && (
              <div className="space-y-4">
                <h4 className="font-medium">Dados do Cartão</h4>
                <Input placeholder="Número do cartão *" required />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/AA *" required />
                  <Input placeholder="CVV *" required />
                </div>
                <Input placeholder="Nome no cartão *" required />
              </div>
            )}

            {/* Urgency Indicator */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-700 text-center">
                ⚡ <strong>Últimas unidades!</strong> Mais de 50 pessoas estão vendo este produto
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 text-lg"
              onClick={paymentMethod === 'pix' ? handlePixPayment : undefined}
            >
              {paymentMethod === 'pix' ? 'GERAR PIX' : 'FINALIZAR PEDIDO'}
            </Button>

            {/* Guarantee */}
            <div className="text-center text-sm text-gray-600">
              <p>✅ Garantia de 30 dias | 🔒 Dados protegidos com SSL</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Confirmation Modal */}
      <Dialog open={showPixConfirmation} onOpenChange={setShowPixConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento PIX</DialogTitle>
            <DialogDescription>
              Você está prestes a gerar um código PIX para pagamento
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center p-4">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="font-semibold mb-2">Pagamento via PIX</h3>
              <p className="text-sm text-gray-600 mb-4">
                Após confirmar, você receberá o código PIX para realizar o pagamento de forma instantânea.
              </p>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  <strong>Total: R$ {total.toFixed(2)}</strong>
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowPixConfirmation(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={confirmPixPayment}
                className="flex-1 bg-[#D1447D] hover:bg-[#B13A6B]"
              >
                Confirmar PIX
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout;
