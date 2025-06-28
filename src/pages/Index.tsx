
import React, { useState } from 'react';
import { Star, Search, User, Droplets, ShoppingBag, MapPin, Zap, Sun, Snowflake, CheckCircle, Play, X, Plus, Minus, Trash2, CreditCard, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import Checkout from '@/components/Checkout';

const Index = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('melancia');
  const [email, setEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bluu Hidratação Melancia',
      price: 59.90,
      originalPrice: 179.90,
      quantity: 2,
      image: '/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png'
    }
  ]);

  const flavors = [
    { id: 'melancia', name: 'Melancia', available: true },
    { id: 'pessego', name: 'Pêssego', available: false },
    { id: 'roma', name: 'Romã', available: false },
    { id: 'limao', name: 'Limão Siciliano', available: false },
    { id: 'tropical', name: 'Frutas Tropicais', available: false }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNotifyMe = () => {
    if (email) {
      toast({
        title: "🎉 Obrigado! Você será o primeiro a saber.",
        description: "Te avisaremos assim que os novos sabores chegarem.",
      });
      setEmail('');
    }
  };

  const handleNewsletter = () => {
    if (newsletterEmail) {
      toast({
        title: "Bem-vindo ao universo Bluu!",
        description: "Você ganhou 10% de desconto na primeira compra.",
      });
      setNewsletterEmail('');
    }
  };

  const handleAddToCart = () => {
    // Update cart with selected quantity
    const newItem = {
      id: Date.now(),
      name: 'Bluu Hidratação Melancia',
      price: 59.90,
      originalPrice: 179.90,
      quantity: quantity,
      image: '/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png'
    };
    
    setCartItems([newItem]);
    setIsCartOpen(true);
    toast({
      title: "Produto adicionado ao carrinho!",
      description: "Bluu Hidratação Melancia foi adicionado com sucesso.",
    });
  };

  const handleFreshnessClick = () => {
    setQuantity(1);
    handleAddToCart();
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
      setIsCartOpen(false);
      toast({
        title: "Produto removido do carrinho",
        description: "Carrinho está vazio agora.",
      });
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShipping = () => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    return totalQuantity >= 2 ? 0 : 10.90;
  };

  const getTotalWithShipping = () => {
    return getSubtotal() + getShipping();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto max-w-6xl px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl md:text-3xl font-bold text-[#D1447D]">Bluu</div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                Produtos
              </button>
              <button 
                onClick={() => scrollToSection('how-to-use')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                Benefícios
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                FAQ
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-left text-gray-700 hover:text-[#D1447D] transition-colors py-2"
                >
                  Produtos
                </button>
                <button 
                  onClick={() => scrollToSection('how-to-use')}
                  className="text-left text-gray-700 hover:text-[#D1447D] transition-colors py-2"
                >
                  Como Funciona
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="text-left text-gray-700 hover:text-[#D1447D] transition-colors py-2"
                >
                  Benefícios
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-left text-gray-700 hover:text-[#D1447D] transition-colors py-2"
                >
                  Depoimentos
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-left text-gray-700 hover:text-[#D1447D] transition-colors py-2"
                >
                  FAQ
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-8 md:py-16 bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Product Info */}
            <div className="space-y-4 md:space-y-6 order-1">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                  Bluu Hidratação Saborizada – Melancia
                </h1>
                <div className="flex items-center space-x-2 mb-3 md:mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">4,9 (128 avaliações)</span>
                </div>

                {/* Mobile Product Images - Between price and description */}
                <div className="md:hidden mb-4">
                  <div className="bg-gradient-to-br from-[#A8D0E6]/20 to-[#F3C4EB]/20 rounded-2xl p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <img 
                        src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
                        alt="Pessoa feliz segurando copo com Bluu" 
                        className="w-full rounded-xl object-cover"
                      />
                      <img 
                        src="/lovable-uploads/05e1589c-4d0f-4d71-8f95-691254a15e3e.png" 
                        alt="Copo com Bluu melancia na beira da piscina com fatias de melancia" 
                        className="w-full rounded-xl object-cover"
                      />
                    </div>
                    <img 
                      src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png" 
                      alt="Bluu Hidratação Melancia - Caixa do produto com melancia e cubos de gelo" 
                      className="w-full max-w-xs mx-auto drop-shadow-2xl"
                    />
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                  Transforme qualquer 500 ml de água em uma explosão refrescante sem adição de açúcar ou ingredientes artificiais. Rica em vitamina C, antioxidante e sem glúten.
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 italic leading-relaxed">
                  <strong>Sabor Melancia:</strong> Como morder uma melancia doce depois de um mergulho no mar salgado. Um sabor refrescante e matador da fruta mais suculenta do verão.
                </p>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Escolha seu sabor:</h3>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((flavor) => (
                    <div key={flavor.id} className="relative">
                      <button
                        onClick={() => flavor.available && setSelectedFlavor(flavor.id)}
                        disabled={!flavor.available}
                        className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                          flavor.available
                            ? selectedFlavor === flavor.id
                              ? 'bg-[#D1447D] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        title={flavor.available ? '' : 'Em breve'}
                      >
                        {flavor.name}
                        {!flavor.available && (
                          <span className="ml-1 text-xs opacity-70">- em breve</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and portions moved here */}
              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl font-bold text-[#D1447D]">R$ 59,90</span>
                <Badge variant="secondary" className="text-xs">12 porções</Badge>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">Quantidade:</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="h-8 w-8 md:h-10 md:w-10 p-0"
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <span className="px-3 md:px-4 py-2 font-medium text-sm md:text-base">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 md:h-10 md:w-10 p-0"
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600">
                    {quantity > 1 ? `${quantity} unidades` : '1 unidade'}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white py-3 text-sm md:text-lg font-semibold"
                >
                  ADICIONAR AO CARRINHO
                </Button>
              </div>
            </div>

            {/* Product Images - Desktop Only */}
            <div className="relative order-2 hidden md:block">
              <div className="bg-gradient-to-br from-[#A8D0E6]/20 to-[#F3C4EB]/20 rounded-2xl md:rounded-3xl p-4 md:p-8">
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  <img 
                    src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
                    alt="Pessoa feliz segurando copo com Bluu" 
                    className="w-full rounded-xl md:rounded-2xl object-cover"
                  />
                  <img 
                    src="/lovable-uploads/05e1589c-4d0f-4d71-8f95-691254a15e3e.png" 
                    alt="Copo com Bluu melancia na beira da piscina com fatias de melancia" 
                    className="w-full rounded-xl md:rounded-2xl object-cover"
                  />
                </div>
                <img 
                  src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png" 
                  alt="Bluu Hidratação Melancia - Caixa do produto com melancia e cubos de gelo" 
                  className="w-full max-w-xs md:max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Lead Capture */}
          <div className="mt-12 md:mt-16 bg-[#F3C4EB]/10 rounded-2xl p-6 md:p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Quer ser avisado quando os novos sabores chegarem?
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Digite seu e-mail e receba um cupom exclusivo assim que Pêssego, Romã, 
                Limão Siciliano ou Frutas Tropicais estiverem disponíveis.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button 
                  onClick={handleNotifyMe}
                  className="bg-[#D1447D] hover:bg-[#B13A6B] text-white text-sm whitespace-nowrap"
                >
                  QUERO SER AVISADO
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 md:space-y-8 lg:pr-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  Transforme água em Bluu refrescante
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Beba mais água com Bluu! É só adicionar um sachê Bluu em 500 ml de água gelada para viver uma explosão de sabor com zero açúcar e 0 kcal.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4 md:space-y-6 mt-8 md:mt-12">
                {/* Step 1 */}
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-5 h-5 md:w-6 md:h-6 text-blue-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">ÁGUA</h3>
                    <p className="text-sm md:text-base text-gray-600">Adicione 500 ml de água gelada</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-600 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">SACHÊ</h3>
                    <p className="text-sm md:text-base text-gray-600">Abra e adicione o conteúdo de 1 stick Bluu</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-xl md:text-2xl">😋</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">APROVEITE</h3>
                    <p className="text-sm md:text-base text-gray-600">Beba sua hidratação saborizada e curta o momento</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-square bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/505be2f2-8cbf-4d1f-9a2a-82608c47b606.png" 
                  alt="Dissolução efervescente Bluu com bolhas rosa em água"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#D1447D] to-[#B13A6B] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#A8D0E6] to-[#85C1E6] rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Por que escolher Bluu Melancia?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Droplets, title: 'Hidratação inteligente', desc: 'Água + sabor + nutrientes essenciais' },
              { icon: CheckCircle, title: 'Zero açúcar', desc: 'Adoçado com sucralose natural' },
              { icon: Zap, title: 'Praticidade absoluta', desc: 'Misture em qualquer lugar, a qualquer hora' },
              { icon: Sun, title: '0 kcal', desc: 'Sabor sem culpa, hidratação sem peso' }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <benefit.icon className="w-10 h-10 md:w-12 md:h-12 text-[#D1447D] mx-auto mb-3 md:mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bluu em Ação Section */}
      <section className="py-12 md:py-20 bg-[#F8D0D8]/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Bluu em Ação!
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Mais que hidratar: descubra como Bluu substitui o refri e ainda deixa suas receitas muito mais divertidas!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Drinks & Mocktails - Trocando com a imagem do aperol */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/80f3bea2-f9e8-4ed6-8d03-8cfdf1b18e3b.png"
                  alt="Copo alto com água com gás, cubos de gelo e Bluu efervescente"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  Drinks & Mocktails Insta-Ready
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Crie coquetéis sem culpa e surpreenda os amigos com cores naturais, refrescância e baixa calorias.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 - Troque o Refrigerante - Trocando com a imagem do mocktail */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/0126cf3a-1512-4b08-93bd-360e4d74ba6a.png"
                  alt="Taça com mocktail colorido, gelo e hortelã"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  Troque o Refrigerante
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Misture Bluu na água com gás. Uma alternativa incrivelmente saborosa e saudável para evitar o refrigerante...
                </p>
              </CardContent>
            </Card>

            {/* Card 3 - Picolés */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/lovable-uploads/c307a0ce-6b24-419a-a3b7-ed55ab836b4e.png"
                  alt="Picolés coloridos feitos com Bluu e frutas frescas"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  Picolés Pop & Fresh
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Congele Bluu com pedaços de fruta para um snack leve e refrescante nos dias quentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feel the Fresh Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#A8D0E6]/40 to-[#F3C4EB]/40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <img 
                src="/lovable-uploads/5a437cbb-358f-4ea8-b4ad-f214512fb376.png" 
                alt="Bluu Hidratação Melancia - Sachê individual com fatia de melancia" 
                className="w-full max-w-xs md:max-w-sm mx-auto"
              />
            </div>
            
            <div className="space-y-4 md:space-y-6 order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Refrescância que cabe no bolso
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Sabor de melancia geladinha, zero açúcar e 0 kcal. Perfeito para todos os momentos.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  { icon: '💼', text: 'Para o seu dia a dia' },
                  { icon: '⚡', text: 'Vitaminas essenciais' },
                  { icon: '🌞', text: 'Saboroso e prático' },
                  { icon: '💧', text: 'Hidratação clean' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                    <span className="text-sm md:text-base text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleFreshnessClick}
                className="bg-white text-[#D1447D] border border-[#D1447D] hover:bg-[#D1447D] hover:text-white text-sm md:text-base"
              >
                QUERO SENTIR ESSA FRESHNESS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-12 md:py-16 bg-gradient-to-br from-[#A8D0E6]/30 via-white to-[#F3C4EB]/30">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="mb-6 md:mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 md:px-6 py-2 md:py-3 mb-3 md:mb-4 text-sm md:text-lg font-semibold shadow-lg">
              ✅ Clientes satisfeitos com a hidratação Bluu
            </Badge>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 bg-gradient-to-r from-[#D1447D] to-[#A8D0E6] bg-clip-text text-transparent">
            A hidratação saborizada que conquistou o Brasil
          </h2>
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
            Bluu é citado em +1.000 reviews 5★ como "o empurrãozinho perfeito para beber água".
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {[
              { 
                name: 'Paula Silva', 
                location: 'Rio de Janeiro, RJ',
                context: 'Fisioterapeuta', 
                emoji: '🏖️',
                review: 'Bluu mudou minha relação com a água! Agora consigo beber os 2L recomendados sem esforço. Levo sempre para a praia.',
                verified: true,
                date: 'Há 2 semanas',
                bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
                border: 'border-blue-200'
              },
              { 
                name: 'Gabriel Santos', 
                location: 'São Paulo, SP',
                context: 'Executivo de Marketing', 
                emoji: '💼',
                review: 'Trabalho 10h por dia e sempre esquecia de me hidratar. Com Bluu, virou hábito automático. Recomendo 100%!',
                verified: true,
                date: 'Há 1 mês',
                bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
                border: 'border-purple-200'
              },
              { 
                name: 'Juliana Costa', 
                location: 'Belo Horizonte, MG',
                context: 'Personal Trainer', 
                emoji: '🏋️‍♀️',
                review: 'Uso com meus alunos há 6 meses. Zero açúcar, sabor incrível e hidratação perfeita pós-treino. Aprovadíssimo!',
                verified: true,
                date: 'Há 3 semanas',
                bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
                border: 'border-green-200'
              }
            ].map((person, index) => (
              <Card key={index} className={`relative overflow-hidden ${person.bg} ${person.border} border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent className="p-3 md:p-8">
                  <div className="absolute top-2 right-2 md:top-4 md:right-4">
                    {person.verified && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full">
                        <CheckCircle className="w-2 h-2 md:w-3 md:h-3" />
                        <span className="text-xs font-medium">Verificado</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-2xl md:text-5xl mb-3 md:mb-6">{person.emoji}</div>
                  
                  <div className="flex items-center justify-center mb-3 md:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-3 md:mb-6 italic leading-relaxed text-xs md:text-lg font-medium">
                    "{person.review}"
                  </p>
                  
                  <div className="border-t pt-3 md:pt-6">
                    <p className="font-bold text-gray-900 text-sm md:text-lg">{person.name}</p>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">{person.location}</p>
                    <p className="text-xs text-gray-500 mt-1 md:mt-2">{person.context} • {person.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#D1447D]/15 via-[#A8D0E6]/15 to-[#F3C4EB]/15 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12 mb-6 md:mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-[#D1447D] mb-1 md:mb-2">4.9</div>
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">Avaliação média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-[#D1447D] mb-1 md:mb-2">1.247</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">Reviews totais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-[#D1447D] mb-1 md:mb-2">97%</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">Recomendariam</div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#D1447D] to-[#B13A6B] text-white px-4 md:px-8 py-2 md:py-3 text-base md:text-2xl font-bold shadow-lg">
              O produto que vem para mudar seu relacionamento com a água
            </Badge>
          </div>
        </div>
      </section>

      {/* Nutritional Info */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Informação Nutricional
          </h2>
          <div className="flex justify-center">
            <Card className="max-w-md border-2 border-[#D3EAF9]" style={{ maxWidth: '480px' }}>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-bold text-gray-900 mb-3 md:mb-4 text-center text-sm md:text-base">Por porção (500ml):</h3>
                <div className="space-y-1 md:space-y-2" style={{ fontSize: '12px' }}>
                  <div className="flex justify-between">
                    <span>Calorias</span>
                    <span className="font-semibold">0 kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carboidratos</span>
                    <span className="font-semibold">1,3 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Açúcar</span>
                    <span className="font-semibold">0 g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sódio</span>
                    <span className="font-semibold">22 mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potássio</span>
                    <span className="font-semibold">65 mg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitamina C</span>
                    <span className="font-semibold">30 mg</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t">
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    <strong>Ingredientes naturais:</strong> fibras de tapioca, aroma natural de melancia, sucralose, corante de beterraba. <strong>NÃO CONTÉM GLÚTEN.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {[
              {
                q: "Como preparar o Bluu?",
                a: "Misture 1 sachê em 500ml de água gelada e mexa bem. Pronto!"
              },
              {
                q: "Contém açúcar?",
                a: "Não! Bluu é adoçado com sucralose, um adoçante natural sem calorias."
              },
              {
                q: "Quantas vezes posso tomar por dia?",
                a: "Recomendamos até 3 porções por dia para uma hidratação ideal."
              },
              {
                q: "É vegano?",
                a: "Sim! Todos os ingredientes são de origem vegetal."
              },
              {
                q: "Crianças podem tomar?",
                a: "Sim, é seguro para crianças acima de 3 anos, com moderação."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900 text-sm md:text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-12 md:py-16 bg-[#D1447D]">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            Entre para o universo Bluu
          </h2>
          <p className="text-pink-100 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
            Receba dicas exclusivas de hidratação e faça parte da nossa comunidade!
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white text-sm"
            />
            <Button 
              onClick={handleNewsletter}
              className="bg-white text-[#D1447D] hover:bg-gray-100 text-sm whitespace-nowrap"
            >
              QUERO ME INSCREVER
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center space-y-6">
            <div className="text-xl md:text-2xl font-bold text-[#D1447D]">Bluu</div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Hidratação saborizada que transforma sua relação com a água.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 mt-6 md:mt-8 text-center text-gray-400 text-sm md:text-base">
            <p>© Bluu 2025 – todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg font-bold">Carrinho</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {getShipping() === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs md:text-sm text-green-800 font-medium flex items-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Parabéns! Você ganhou FRETE GRÁTIS 💚
                </p>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs md:text-sm text-orange-800 font-medium flex items-center">
                  <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Adicione mais uma unidade para liberar frete grátis!
                </p>
              </div>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 md:p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-xs md:text-sm">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs md:text-sm font-bold text-[#D1447D]">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.quantity} {item.quantity > 1 ? 'Unidades' : 'Unidade'}</p>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-6 w-6 md:h-8 md:w-8 p-0"
                  >
                    <Minus className="h-2 w-2 md:h-3 md:w-3" />
                  </Button>
                  <span className="text-xs md:text-sm font-medium w-6 md:w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-6 w-6 md:h-8 md:w-8 p-0"
                  >
                    <Plus className="h-2 w-2 md:h-3 md:w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 0)}
                  className="h-6 w-6 md:h-8 md:w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-2 w-2 md:h-3 md:w-3" />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Subtotal</span>
                <span className="font-medium">R$ {getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Frete</span>
                <span className={`font-medium ${getShipping() === 0 ? 'text-green-600' : ''}`}>
                  R$ {getShipping().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-base md:text-lg border-t pt-2">
                <span>Total</span>
                <span>R$ {getTotalWithShipping().toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-2 md:py-3 text-sm md:text-base"
              >
                FINALIZAR COMPRA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={getTotalWithShipping()}
        shipping={getShipping()}
      />
    </div>
  );
};

export default Index;
