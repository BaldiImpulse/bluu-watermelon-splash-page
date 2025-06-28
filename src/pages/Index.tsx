import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Checkout from '@/components/Checkout';

const Index = () => {
  const [cartItems, setCartItems] = useState<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const product = {
    id: 1,
    name: 'Bluu Hidratação Melancia',
    price: 59.90,
    image: '/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png'
  };

  const addToCart = () => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== item.id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.72; // Corrigido para 9,72
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Bluu
          </h1>
        </div>
      </header>

      <section className="container mx-auto mt-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="rounded-lg shadow-md" 
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h2>
            <p className="text-gray-700 text-lg mb-6">
              Experimente a explosão de hidratação com o sabor refrescante da melancia.
            </p>
            <div className="flex items-center justify-between mb-8">
              <span className="text-4xl font-bold text-[#D1447D]">R$ {product.price.toFixed(2)}</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                🔥 25% OFF
              </Badge>
            </div>
            <Button 
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3"
              onClick={addToCart}
            >
              ADICIONAR AO CARRINHO
            </Button>
          </div>
        </div>
      </section>
      
      {/* Shopping Cart Modal */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Carrinho
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-800 text-sm font-medium">
                    ➕ Adicione mais uma unidade para liberar frete grátis!
                  </p>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img 
                      src={item.image || '/placeholder.svg'} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-[#D1447D] font-bold">R$ {item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{item.quantity} Unidade</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white"
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                >
                  FINALIZAR COMPRA
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Component */}

      <Checkout 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        total={total}
        shipping={shipping}
      />
    </div>
  );
};

export default Index;
