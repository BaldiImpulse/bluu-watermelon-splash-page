import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Checkout from '@/components/Checkout';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Bluu Pod Morango Kiwi",
      price: 49.90,
      image: "/lovable-uploads/69649993-f3ff-4399-b343-0c072a743797.png",
      quantity: 1,
    },
  ]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shipping, setShipping] = useState(10);

  useEffect(() => {
    if (calculateTotal() >= 99) {
      setShipping(0);
    } else {
      setShipping(10);
    }
  }, [cartItems]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = () => {
    return shipping;
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-gray-800">
            Bluu
          </a>
          <nav className="space-x-6">
            <a href="#sabores" className="text-gray-600 hover:text-gray-800">
              Sabores
            </a>
            <a href="#bluu-em-acao" className="text-gray-600 hover:text-gray-800">
              Bluu em Ação
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho
              {cartItems.length > 0 && (
                <Badge className="ml-2 bg-[#D1447D] text-white">
                  {cartItems.length}
                </Badge>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-blue-100 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Descubra o sabor refrescante de Bluu
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            A alternativa perfeita para se hidratar com prazer e saúde.
          </p>
          <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-8 rounded-full">
            Experimente agora
          </Button>
        </div>
      </section>

      {/* Sabores Section */}
      <section id="sabores" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Nossos Sabores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sabor 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/lovable-uploads/69649993-f3ff-4399-b343-0c072a743797.png"
                alt="Morango Kiwi"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Morango Kiwi
                </h3>
                <p className="text-gray-600 mb-4">
                  A doçura do morango e o toque exótico do kiwi em perfeita
                  harmonia.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold">R$49,90</span>
                  <Button
                    onClick={() =>
                      handleAddToCart({
                        id: 1,
                        name: "Bluu Pod Morango Kiwi",
                        price: 49.90,
                        image:
                          "/lovable-uploads/69649993-f3ff-4399-b343-0c072a743797.png",
                        quantity: 1,
                      })
                    }
                    className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-2 px-4 rounded-full"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>

            {/* Sabor 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/lovable-uploads/69649993-f3ff-4399-b343-0c072a743797.png"
                alt="Maracujá"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Maracujá
                </h3>
                <p className="text-gray-600 mb-4">
                  A acidez tropical do maracujá para refrescar seus dias.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold">R$49,90</span>
                  <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-2 px-4 rounded-full">
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>

            {/* Sabor 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/lovable-uploads/69649993-f3ff-4399-b343-0c072a743797.png"
                alt="Limão"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Limão</h3>
                <p className="text-gray-600 mb-4">
                  A leveza cítrica do limão para momentos revigorantes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-bold">R$49,90</span>
                  <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-2 px-4 rounded-full">
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bluu em Ação Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Bluu em Ação
          </h2>
          
          {/* Refrescância que cabe no bolso */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-pink-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#D1447D]">
                  Refrescância que cabe no bolso
                </h3>
                <p className="text-gray-600 mb-6">
                  O Bluu é seu companheiro perfeito para todos os momentos. Leve, prático e delicioso - a hidratação que você merece está sempre ao seu alcance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-pink-500 mr-2">✓</span>
                    Fácil de transportar
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-500 mr-2">✓</span>
                    Praticidade total
                  </li>
                  <li className="flex items-center">
                    <span className="text-pink-500 mr-2">✓</span>
                    Sabor irresistível
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <img 
                  src="/lovable-uploads/505be2f2-8cbf-4d1f-9a2a-82608c47b606.png" 
                  alt="Bluu refrescante" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Troque o refrigerante */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 text-center">
                <img 
                  src="/lovable-uploads/0126cf3a-1512-4b08-93bd-360e4d74ba6a.png" 
                  alt="Alternativa saudável" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold mb-4 text-[#D1447D]">
                  Troque o refrigerante
                </h3>
                <p className="text-gray-600 mb-6">
                  Que tal uma alternativa mais saudável e igualmente saborosa? O Bluu oferece toda a refrescância que você busca, mas com ingredientes naturais e benefícios reais para sua saúde.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Zero açúcar refinado
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Ingredientes naturais
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">✓</span>
                    Rico em vitaminas
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Drink & Mocktails Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#D1447D]">
                  Drinks & Mocktails
                </h3>
                <p className="text-gray-600 mb-6">
                  Use a criatividade e combine Bluu com seus ingredientes
                  favoritos para criar drinks e mocktails incríveis.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Receitas exclusivas
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Combinações surpreendentes
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <img
                  src="/lovable-uploads/0899f94c-3599-495f-8c71-a910954a994a.png"
                  alt="Bebidas criativas"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrega Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Receba Bluu no conforto da sua casa
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Entregamos em todo o Brasil com rapidez e segurança.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex items-center border rounded-full overflow-hidden mb-6">
              <Input
                type="text"
                placeholder="Digite seu endereço"
                className="flex-1 border-none shadow-none focus:ring-0"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
              <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-6 rounded-full">
                <MapPin className="w-5 h-5 mr-2" />
                Verificar
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Frete grátis para pedidos acima de R$99
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2024 Bluu. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Seu Carrinho</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-500">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      onClick={() => handleRemoveFromCart(item.id)}
                      variant="ghost"
                      size="sm"
                    >
                      Remover
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-bold">Subtotal:</span>
                <span className="text-gray-700 font-bold">
                  R$ {calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-bold">Frete:</span>
                <span className="text-gray-700 font-bold">
                  R$ {calculateShipping().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-bold">Total:</span>
                <span className="text-gray-700 font-bold">
                  R$ {(calculateTotal() + calculateShipping()).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleOpenCheckout}
                className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3"
              >
                Finalizar Compra
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={calculateTotal()}
        shipping={calculateShipping()}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default Index;
