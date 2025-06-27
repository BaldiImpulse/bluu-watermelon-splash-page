import React, { useState, useEffect } from 'react';
import { ShoppingCart, Minus, Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Checkout from '@/components/Checkout';

interface Flavor {
  id: number;
  name: string;
  emoji: string;
}

const flavors: Flavor[] = [
  { id: 1, name: 'Melancia', emoji: '🍉' },
  { id: 2, name: 'Morango', emoji: '🍓' },
  { id: 3, name: 'Limão', emoji: '🍋' },
  { id: 4, name: 'Uva', emoji: '🍇' },
  { id: 5, name: 'Maracujá', emoji: '🥭' },
  { id: 6, name: 'Tangerina', emoji: '🍊' },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const addToCart = () => {
    if (!selectedFlavor) {
      alert('Por favor, escolha um sabor.');
      return;
    }

    const flavor = flavors.find((f) => f.id === selectedFlavor);
    if (!flavor) {
      alert('Sabor não encontrado.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: `Bluu ${flavor.name}`,
      price: 59.90,
      quantity: quantity,
    };

    setCartItems([...cartItems, newItem]);
    setShowToast(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleNewsletterSignup = () => {
    alert(`E-mail ${email} cadastrado com sucesso!`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/lovable-uploads/c307a0ce-6b24-419a-a3b7-ed55ab836b4e.png" alt="Bluu Logo" className="h-8 w-auto" />
          </div>
          <button 
            onClick={() => setShowCart(true)}
            className="relative p-2 text-gray-600 hover:text-gray-900 md:p-3"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D1447D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center md:-top-2 md:-right-2 md:h-6 md:w-6">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                Hidratação <span className="text-[#D1447D]">saborizada</span> que transforma sua relação com a água
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
                Descubra o sabor refrescante que vai revolucionar seu dia a dia
              </p>
              <Button 
                onClick={() => document.getElementById('produto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#D1447D] hover:bg-[#B13A6B] text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full"
              >
                Experimente Agora
              </Button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="/lovable-uploads/a7311deb-414f-4fb5-bbf6-62df9c9216f3.png" 
                alt="Copo Bluu na beira da piscina" 
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hydration */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/4994599f-56a1-4997-995d-999915f13a97.png" alt="Hidratação" className="h-12 w-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hidratação Eficaz</h3>
              <p className="text-gray-600">Mantenha-se hidratado com sabores deliciosos e refrescantes.</p>
            </div>

            {/* Health */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/68f93508-a47a-499f-8a0d-3a991715e04a.png" alt="Saúde" className="h-12 w-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mais Saúde</h3>
              <p className="text-gray-600">Fórmula rica em vitaminas e minerais essenciais.</p>
            </div>

            {/* Flavor */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/95492994-3529-4699-9699-99a99b969991.png" alt="Sabor" className="h-12 w-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sabor Incrível</h3>
              <p className="text-gray-600">Transforme sua água em uma explosão de sabores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como Preparar
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              É fácil e rápido transformar sua água em uma bebida deliciosa e nutritiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/99999999-9999-9999-9999-999999999991.png" alt="Passo 1" className="h-24 w-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Passo 1</h3>
              <p className="text-gray-600">Adicione um sachê de Bluu em 500ml de água gelada.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/99999999-9999-9999-9999-999999999992.png" alt="Passo 2" className="h-24 w-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Passo 2</h3>
              <p className="text-gray-600">Misture bem até o pó se dissolver completamente.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <img src="/lovable-uploads/99999999-9999-9999-9999-999999999993.png" alt="Passo 3" className="h-24 w-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Passo 3</h3>
              <p className="text-gray-600">Aproveite sua Bluu Hidratação a qualquer hora e lugar!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="produto" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Bluu Hidratação
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                O pó solúvel que transforma água comum em uma experiência refrescante e saudável
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Product Image */}
              <div className="order-2 lg:order-1">
                <img 
                  src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png" 
                  alt="Bluu Hidratação Melancia" 
                  className="w-full h-auto object-contain max-w-md mx-auto"
                />
              </div>

              {/* Product Info */}
              <div className="order-1 lg:order-2 space-y-6">
                {/* Price and Installments - Moved above flavor selection */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-gray-500 line-through">R$ 179,90</span>
                      <span className="text-2xl md:text-3xl font-bold text-[#D1447D]">R$ 59,90</span>
                    </div>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      66% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">ou 12x de R$ 4,99 sem juros</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Escolha seu sabor:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {flavors.map((flavor) => (
                      <button
                        key={flavor.id}
                        onClick={() => setSelectedFlavor(flavor.id)}
                        className={`p-3 md:p-4 rounded-lg border-2 transition-all text-left ${
                          selectedFlavor === flavor.id
                            ? 'border-[#D1447D] bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-lg mb-1">{flavor.emoji}</div>
                        <div className="font-medium text-sm md:text-base">{flavor.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Images - Between description and add to cart */}
                <div className="block md:hidden">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <img 
                      src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
                      alt="Bluu sendo preparado" 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                    <img 
                      src="/lovable-uploads/80f3bea2-f9e8-4ed6-8d03-8cfdf1b18e3b.png" 
                      alt="Copo com Bluu" 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Quantidade:</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={addToCart}
                  className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 md:py-4 text-base md:text-lg rounded-full"
                >
                  ADICIONAR AO CARRINHO
                </Button>

                {/* Desktop Images - After add to cart button */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <img 
                      src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
                      alt="Bluu sendo preparado" 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                    <img 
                      src="/lovable-uploads/80f3bea2-f9e8-4ed6-8d03-8cfdf1b18e3b.png" 
                      alt="Copo com Bluu" 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Quer ser avisado quando novos sabores chegarem?</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      placeholder="Seu e-mail" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleNewsletterSignup}
                      className="bg-[#D1447D] hover:bg-[#B13A6B] text-white px-6 py-2 whitespace-nowrap"
                    >
                      Me Avisar
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="mb-2">✓ Frete grátis para todo o Brasil</p>
                  <p className="mb-2">✓ Entrega em até 7 dias úteis</p>
                  <p>✓ Garantia de 30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que dizem sobre Bluu
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Veja o que nossos clientes estão falando sobre a experiência com Bluu Hidratação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4">
                "Bluu mudou minha forma de beber água! Os sabores são incríveis e me ajudam a me manter hidratado o dia todo."
              </p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Cliente 1" className="h-8 w-8 rounded-full mr-3" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Maria Silva</p>
                  <p className="text-gray-500">Cliente Bluu</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4">
                "Eu sempre tive dificuldade em beber água, mas com Bluu ficou muito mais fácil e prazeroso. Recomendo a todos!"
              </p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Cliente 2" className="h-8 w-8 rounded-full mr-3" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">João Santos</p>
                  <p className="text-gray-500">Cliente Bluu</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-4">
                "Os sabores de Bluu são deliciosos e me ajudam a evitar refrigerantes e outras bebidas açucaradas. Ótima opção para quem busca uma vida mais saudável."
              </p>
              <div className="flex items-center">
                <img src="https://via.placeholder.com/40" alt="Cliente 3" className="h-8 w-8 rounded-full mr-3" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">Ana Oliveira</p>
                  <p className="text-gray-500">Cliente Bluu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Experimente Bluu Sem Riscos
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Estamos tão confiantes de que você vai amar Bluu Hidratação, que oferecemos uma garantia de 30 dias. Se por qualquer motivo você não estiver satisfeito, entre em contato conosco e devolvemos seu dinheiro.
            </p>
            <img src="/lovable-uploads/99999999-9999-9999-9999-999999999994.png" alt="Garantia de 30 dias" className="h-20 w-auto mx-auto mb-6" />
            <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-full">
              Quero Experimentar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre Bluu Hidratação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                O que é Bluu Hidratação?
              </h3>
              <p className="text-gray-700">
                Bluu Hidratação é um pó solúvel que transforma água comum em uma bebida saborizada e nutritiva.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quais são os sabores disponíveis?
              </h3>
              <p className="text-gray-700">
                Atualmente, oferecemos sabores de melancia, morango, limão, uva, maracujá e tangerina.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Como devo preparar Bluu Hidratação?
              </h3>
              <p className="text-gray-700">
                Adicione um sachê em 500ml de água gelada, misture bem e aproveite!
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bluu Hidratação contém açúcar?
              </h3>
              <p className="text-gray-700">
                Não, Bluu Hidratação não contém açúcar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img src="/lovable-uploads/c307a0ce-6b24-419a-a3b7-ed55ab836b4e.png" alt="Bluu Logo" className="h-8 w-auto mx-auto mb-4 brightness-0 invert" />
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Hidratação saborizada que transforma sua relação com a água.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
              <span className="hidden sm:inline">|</span>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-500">
              <p>&copy; 2024 Bluu. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Carrinho</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
            ) : (
              <>
                {/* Free Shipping Banner */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Parabéns! Você ganhou FRETE GRÁTIS 💚
                  </span>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png" 
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="line-through">R$ 179,90</span>
                        <span className="font-bold text-[#D1447D]">R$ {item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500">1 Unidade</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Cart Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Subtotal</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3"
                  >
                    FINALIZAR COMPRA
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCart(false)}
                    className="w-full"
                  >
                    CONTINUAR COMPRANDO
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout */}
      <Checkout 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        total={getTotal()}
      />

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✓ Produto adicionado ao carrinho!
        </div>
      )}
    </div>
  );
};

export default Index;
