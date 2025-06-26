import React, { useState } from 'react';
import { Star, Droplets, CheckCircle, Zap, Sun, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('melancia');
  const [email, setEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bluu Hidratação Melancia',
      price: 89.90,
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
    setIsCartOpen(true);
    toast({
      title: "Produto adicionado ao carrinho!",
      description: "Bluu Hidratação Melancia foi adicionado com sucesso.",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#A8D0E6] py-3">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium text-gray-800">
            FRETE GRÁTIS PARA TODO O BRASIL NAS COMPRAS ACIMA DE R$ 199,90
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-[#D1447D]">Bluu</div>
            
            <nav className="flex items-center space-x-8">
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
              <button 
                onClick={() => scrollToSection('newsletter')}
                className="text-gray-700 hover:text-[#D1447D] transition-colors"
              >
                Blog
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-16 bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="container mx-auto max-w-7xl px-4">
          {/* New Grid Layout */}
          <div className="gallery grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 mb-12"
               style={{
                 gridTemplateAreas: `
                   "thumb1 hero hero ."
                   "thumb2 hero hero copy"
                   "thumb3 imgA imgB copy"
                   ". imgC imgC copy"
                 `
               }}>
            
            {/* Thumbnail 1 - Close-up melancia fatiada */}
            <div className="thumb1 hidden md:block" style={{ gridArea: 'thumb1' }}>
              <img 
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Close-up melancia fatiada" 
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Thumbnail 2 - Close-up polpa da melancia */}
            <div className="thumb2 hidden md:block" style={{ gridArea: 'thumb2' }}>
              <img 
                src="https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Close-up polpa da melancia" 
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Thumbnail 3 - Close-up gotas d'água sobre casca */}
            <div className="thumb3 hidden md:block" style={{ gridArea: 'thumb3' }}>
              <img 
                src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Close-up gotas d'água sobre casca" 
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Hero - Mock-up 3D da caixinha Bluu */}
            <div className="hero bg-gradient-to-br from-[#A8D0E6]/20 to-[#F3C4EB]/20 rounded-3xl p-8 flex items-center justify-center" style={{ gridArea: 'hero' }}>
              <img 
                src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png" 
                alt="Bluu Hidratação Melancia - Mock-up 3D da caixinha" 
                className="w-full max-w-md drop-shadow-2xl"
              />
            </div>

            {/* Image A - Sachê sendo despejado */}
            <div className="imgA hidden md:block" style={{ gridArea: 'imgA' }}>
              <img 
                src="/lovable-uploads/a7311deb-414f-4fb5-bbf6-62df9c9216f3.png" 
                alt="Sachê Bluu sendo despejado em copo com drink de melancia" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Image B - Sachê + caixinha lado a lado */}
            <div className="imgB hidden md:block" style={{ gridArea: 'imgB' }}>
              <img 
                src="/lovable-uploads/5a437cbb-358f-4ea8-b4ad-f214512fb376.png" 
                alt="Sachê Bluu + caixinha lado a lado em close" 
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Image C - Usuária sorrindo segurando sachê */}
            <div className="imgC hidden md:block" style={{ gridArea: 'imgC' }}>
              <img 
                src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
                alt="Pessoa feliz segurando copo com Bluu" 
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Copy - Product Info */}
            <div className="copy space-y-6" style={{ gridArea: 'copy' }}>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Bluu Hidratação Saborizada – Melancia
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4,9 (128 avaliações)</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-[#D1447D]">R$ 89,90</span>
                  <Badge variant="secondary">12 porções</Badge>
                </div>
                <p className="text-gray-600 mb-4">
                  Transforme qualquer 500 ml de água em uma explosão refrescante sem adição de açúcar ou ingredientes artificiais. Rica em vitamina C antioxidante e sem glúten.
                </p>
                <p className="text-gray-600 mb-6 italic">
                  <strong>Sabor Melancia:</strong> Como morder uma melancia doce depois de um mergulho no mar salgado. Um sabor refrescante e matador da fruta mais suculenta do verão.
                </p>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Escolha seu sabor:</h3>
                <div className="flex flex-wrap gap-2">
                  {flavors.map((flavor) => (
                    <div key={flavor.id} className="relative">
                      <button
                        onClick={() => flavor.available && setSelectedFlavor(flavor.id)}
                        disabled={!flavor.available}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
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

              {/* Quantity Selector */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Quantidade:</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">
                    {quantity > 1 ? `${quantity} unidades` : '1 unidade'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white py-3 text-lg font-semibold"
                >
                  ADICIONAR AO CARRINHO
                </Button>
                <a href="#" className="block text-center text-[#D1447D] hover:underline">
                  Assinar & economizar 15%
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Images Row */}
          <div className="md:hidden flex overflow-x-auto gap-4 mb-8 pb-4">
            <img 
              src="/lovable-uploads/a7311deb-414f-4fb5-bbf6-62df9c9216f3.png" 
              alt="Sachê Bluu sendo despejado" 
              className="w-24 h-24 flex-shrink-0 object-cover rounded-xl"
            />
            <img 
              src="/lovable-uploads/5a437cbb-358f-4ea8-b4ad-f214512fb376.png" 
              alt="Sachê + caixinha" 
              className="w-24 h-24 flex-shrink-0 object-cover rounded-xl"
            />
            <img 
              src="/lovable-uploads/1bf3f521-13ce-492f-bdbd-2c96df966c1a.png" 
              alt="Pessoa feliz com Bluu" 
              className="w-24 h-24 flex-shrink-0 object-cover rounded-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Melancia fatiada" 
              className="w-24 h-24 flex-shrink-0 object-cover rounded-xl"
            />
          </div>

          {/* Lead Capture */}
          <div className="mt-16 bg-[#F3C4EB]/10 rounded-2xl p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quer ser avisado quando os novos sabores chegarem?
              </h3>
              <p className="text-gray-600 mb-6">
                Digite seu e-mail e receba um cupom exclusivo assim que Pêssego, Romã, 
                Limão Siciliano ou Frutas Tropicais estiverem disponíveis.
              </p>
              <div className="flex space-x-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleNotifyMe}
                  className="bg-[#D1447D] hover:bg-[#B13A6B] text-white"
                >
                  QUERO SER AVISADO
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section - Transforme água em Bluu */}
      <section id="how-to-use" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                  Transforme água em Bluu refrescante
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Beba mais água com Bluu! É só adicionar um sachê Bluu em 500 ml de água gelada para viver uma explosão de sabor com zero açúcar e cheio de benefícios para sua saúde.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6 mt-12">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">ÁGUA</h3>
                    <p className="text-gray-600">Adicione 500 ml de água gelada</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-600 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">SACHÊ</h3>
                    <p className="text-gray-600">Abra e adicione o conteúdo de 1 stick Bluu</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">😋</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">APROVEITE</h3>
                    <p className="text-gray-600">Beba sua hidratação saborizada e curta o momento</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Copo transparente com água saborizada Bluu de melancia com fatia de melancia ao lado"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#D1447D] to-[#B13A6B] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-[#A8D0E6] to-[#85C1E6] rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher Bluu Melancia?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Droplets, title: 'Hidratação inteligente', desc: 'Água + sabor + nutrientes essenciais' },
              { icon: CheckCircle, title: 'Zero açúcar', desc: 'Adoçado com sucralose natural' },
              { icon: Zap, title: 'Praticidade absoluta', desc: 'Misture em qualquer lugar, a qualquer hora' },
              { icon: Sun, title: 'Só 0 kcal', desc: 'Sabor sem culpa, hidratação sem peso' }
            ].map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-[#D1447D] mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feel the Fresh Section */}
      <section className="py-16 bg-gradient-to-r from-[#A8D0E6]/40 to-[#F3C4EB]/40">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/5a437cbb-358f-4ea8-b4ad-f214512fb376.png" 
                alt="Bluu Hidratação Melancia - Sachê individual com fatia de melancia" 
                className="w-full max-w-sm mx-auto"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Refrescância que cabe no bolso
              </h2>
              <p className="text-xl text-gray-600">
                Sabor de melancia geladinha, zero açúcar e só 0 kcal. Perfeito para o verão.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '💼', text: 'Para o seu dia a dia' },
                  { icon: '⚡', text: 'Pick-me-up instantâneo' },
                  { icon: '🌞', text: 'Saboroso e prático' },
                  { icon: '💧', text: 'Hidratação clean' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-white text-[#D1447D] border border-[#D1447D] hover:bg-[#D1447D] hover:text-white">
                QUERO SENTIR ESSA FRESHNESS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="testimonials" className="py-16 bg-gradient-to-br from-[#A8D0E6]/30 via-white to-[#F3C4EB]/30">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 mb-4 text-lg font-semibold shadow-lg">
              ✅ Mais de 60.000 clientes satisfeitos
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#D1447D] to-[#A8D0E6] bg-clip-text text-transparent">
            A hidratação saborizada que conquistou o Brasil
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Bluu é citado em +1.000 reviews 5★ como "o empurrãozinho perfeito para beber água".
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                name: 'Paula Silva', 
                location: 'Rio de Janeiro, RJ',
                context: 'Praia de Copacabana', 
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
                <CardContent className="p-8">
                  <div className="absolute top-4 right-4">
                    {person.verified && (
                      <div className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs font-medium">Verificado</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-5xl mb-6">{person.emoji}</div>
                  
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg font-medium">
                    "{person.review}"
                  </p>
                  
                  <div className="border-t pt-6">
                    <p className="font-bold text-gray-900 text-lg">{person.name}</p>
                    <p className="text-sm text-gray-600 font-medium">{person.location}</p>
                    <p className="text-xs text-gray-500 mt-2">{person.context} • {person.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#D1447D]/15 via-[#A8D0E6]/15 to-[#F3C4EB]/15 rounded-3xl p-10 shadow-xl">
            <div className="flex items-center justify-center space-x-12 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D1447D] mb-2">4.9</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600 font-medium">Avaliação média</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D1447D] mb-2">1.247</div>
                <div className="text-sm text-gray-600 font-medium">Reviews totais</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D1447D] mb-2">97%</div>
                <div className="text-sm text-gray-600 font-medium">Recomendariam</div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#D1447D] to-[#B13A6B] text-white px-8 py-3 text-lg font-bold shadow-lg">
              🏆 Produto mais vendido da categoria
            </Badge>
          </div>
        </div>
      </section>

      {/* Nutritional Info */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Informação Nutricional
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Por porção (500ml):</h3>
                  <div className="space-y-2">
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
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Ingredientes:</h3>
                  <p className="text-gray-600 mb-4">
                    Isomalto-oligossacarídeo, cítricos, sucralose, beterraba.
                  </p>
                  <Badge className="bg-green-100 text-green-800">NÃO CONTÉM GLÚTEN</Badge>
                  <p className="text-xs text-gray-500 mt-4">*VDs com base em 2000 kcal.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
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
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16 bg-[#D1447D]">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Entre para o universo Bluu
          </h2>
          <p className="text-pink-100 mb-8">
            Ganhe 10% de desconto na primeira compra e receba dicas exclusivas de hidratação
          </p>
          <div className="flex space-x-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-white"
            />
            <Button 
              onClick={handleNewsletter}
              className="bg-white text-[#D1447D] hover:bg-gray-100"
            >
              QUERO DESCONTO
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-[#D1447D] mb-4">Bluu</div>
              <p className="text-gray-400">
                Hidratação saborizada que transforma sua relação com a água.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Melancia</a></li>
                <li><a href="#" className="hover:text-white">Em breve</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Trocas e Devoluções</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>© Bluu 2025 – todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-lg font-bold">Carrinho</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsCartOpen(false)}
                className="p-0 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Parabéns! Você ganhou FRETE GRÁTIS 💚
              </p>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500 line-through">
                      R$ {item.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-[#D1447D]">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.quantity} Unidades</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 0)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold text-lg">R$ {getSubtotal().toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3">
                FINALIZAR COMPRA
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setIsCartOpen(false)}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
