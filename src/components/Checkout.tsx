
import React from 'react';
import { CreditCard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-bold">Finalizar Compra</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="p-1 h-auto hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span className="text-sm">{item.name} x{item.quantity}</span>
                <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Dados Pessoais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Nome completo" />
              <Input placeholder="CPF" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="E-mail" type="email" />
              <Input placeholder="Telefone" />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">Endereço de Entrega</h3>
            <Input placeholder="CEP" />
            <Input placeholder="Endereço" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Número" />
              <Input placeholder="Complemento" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Bairro" />
              <Input placeholder="Cidade" />
            </div>
            <Input placeholder="Estado" />
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold">Forma de Pagamento</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" value="credit" className="text-[#D1447D]" defaultChecked />
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" value="pix" className="text-[#D1447D]" />
                <span className="text-lg">💳</span>
                <span>PIX</span>
              </label>
            </div>
          </div>

          {/* Credit Card Form */}
          <div className="space-y-4">
            <h4 className="font-medium">Dados do Cartão</h4>
            <Input placeholder="Número do cartão" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/AA" />
              <Input placeholder="CVV" />
            </div>
            <Input placeholder="Nome no cartão" />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3">
            FINALIZAR PEDIDO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
