
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, total }) => {
  const subtotal = total - 9.72; // Fixed shipping value

  return (
    <>
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span className="text-sm">{item.name} x{item.quantity}</span>
            <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="space-y-1 mt-3 pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Frete</span>
            <span>R$ 9,72</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Taxas</span>
            <span className="text-green-600 font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Urgency Badge */}
      <div className="text-center">
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          ⚡ Últimas unidades em estoque!
        </Badge>
      </div>
    </>
  );
};

export default OrderSummary;
