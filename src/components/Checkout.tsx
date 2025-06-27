
import React, { useState } from 'react';
import { CreditCard, Shield, Clock, CheckCircle, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import OutOfStockModal from './OutOfStockModal';

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
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [quantity, setQuantity] = useState(cartItems.length > 0 ? cartItems[0].quantity : 1);
  
  // Form states
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

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Remove error when user starts typing
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

    const missingFields = requiredFields.filter(
      ({ field }) => !formData[field as keyof typeof formData]?.trim()
    );

    if (missingFields.length > 0) {
      setErrors(missingFields.map(({ label }) => label));
      return false;
    }

    return true;
  };

  const handlePixGeneration = () => {
    if (validateForm()) {
      setShowOutOfStock(true);
    }
  };

  const handleFinalizeOrder = () => {
    if (validateForm()) {
      setShowOutOfStock(true);
    }
  };

  const confirmPixPayment = () => {
    setShowPixConfirmation(false);
    setShowOutOfStock(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const itemPrice = 59.90;
  const subtotalWithQuantity = itemPrice * quantity;
  const totalWithQuantity = subtotalWithQuantity + shipping;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Finalizar Compra
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-4 bg-green-50 rounded-lg p-3">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Pagamento Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Entrega Rápida</span>
              </div>
            </div>

            {/* Shipping alert */}
            {shipping > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs md:text-sm text-orange-800 font-medium flex items-center">
                  <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Adicione mais uma unidade para liberar frete grátis!
                </p>
              </div>
            )}

            {/* Order Summary with Quantity Control */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Resumo do Pedido</h3>
              
              {/* Quantity Control */}
              <div className="flex justify-between items-center mb-4 p-3 bg-white rounded-lg border">
                <div className="flex-1">
                  <p className="font-medium">Bluu em Ação</p>
                  <p className="text-sm text-gray-600">R$ {itemPrice.toFixed(2)} cada</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 mt-3 pt-2 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span>Subtotal</span>
                  <span>R$ {subtotalWithQuantity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    R$ {shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Taxas</span>
                  <span className="text-green-600 font-medium">R$ 0,00</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>R$ {totalWithQuantity.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 font-medium mb-2">Preencha os campos obrigatórios:</p>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Urgency Badge */}
            <div className="text-center">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                ⚡ Últimas unidades em estoque!
              </Badge>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Dados Pessoais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Nome completo" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <Input 
                  placeholder="Telefone" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <Input 
                placeholder="E-mail" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Endereço de Entrega
              </h3>
              <Input 
                placeholder="CEP" 
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
              />
              <Input 
                placeholder="Endereço" 
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Número" 
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                />
                <Input 
                  placeholder="Complemento" 
                  value={formData.complement}
                  onChange={(e) => handleInputChange('complement', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Cidade" 
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
                <Input 
                  placeholder="Estado" 
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method */}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-lg">💳</span>
                  <span>PIX</span>
                  <Badge className="ml-auto bg-blue-100 text-blue-800">Instantâneo</Badge>
                </label>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'credit' && (
              <div className="space-y-4">
                <h4 className="font-medium">Dados do Cartão</h4>
                <Input 
                  placeholder="Número do cartão" 
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="MM/AA" 
                    value={formData.cardExpiry}
                    onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                  />
                  <Input 
                    placeholder="CVV" 
                    value={formData.cardCvv}
                    onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                  />
                </div>
                <Input 
                  placeholder="Nome no cartão" 
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                />
              </div>
            )}

            {/* Security Badge */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">
                  Seus dados estão protegidos com criptografia SSL
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={paymentMethod === 'pix' ? handlePixGeneration : handleFinalizeOrder}
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3"
            >
              {paymentMethod === 'pix' ? 'GERAR PIX' : 'FINALIZAR PEDIDO'}
            </Button>

            {/* Guarantee */}
            <div className="text-center text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium">Garantia de 30 dias ou seu dinheiro de volta</span>
              </div>
              <p>Compra 100% segura e protegida</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Confirmation Modal */}
      <Dialog open={showPixConfirmation} onOpenChange={setShowPixConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmação do PIX</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <div className="text-4xl">💳</div>
            <p className="text-gray-600">
              Você está prestes a gerar um código PIX no valor de <strong>R$ {totalWithQuantity.toFixed(2)}</strong>
            </p>
            <p className="text-sm text-gray-500">
              O código PIX terá validade de 15 minutos
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPixConfirmation(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-[#D1447D] hover:bg-[#B13A6B]"
                onClick={confirmPixPayment}
              >
                Confirmar PIX
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Out of Stock Modal */}
      <OutOfStockModal 
        isOpen={showOutOfStock}
        onClose={() => setShowOutOfStock(false)}
      />
    </>
  );
};

export default Checkout;
