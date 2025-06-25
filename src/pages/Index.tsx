
import React, { useState } from 'react';
import { Star, Search, User, Droplets, ShoppingBag, MapPin, Zap, Sun, Snowflake, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedFlavor, setSelectedFlavor] = useState('melancia');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const flavors = [
    { id: 'melancia', name: 'Melancia', available: true },
    { id: 'pessego', name: 'Pêssego', available: false },
    { id: 'roma', name: 'Romã', available: false },
    { id: 'limao', name: 'Limão Siciliano', available: false },
    { id: 'tropical', name: 'Frutas Tropicais', available: false }
  ];

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
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-[#D1447D] transition-colors">Produtos</a>
              <a href="#" className="text-gray-700 hover:text-[#D1447D] transition-colors">Como Funciona</a>
              <a href="#" className="text-gray-700 hover:text-[#D1447D] transition-colors">Depoimentos</a>
              <a href="#" className="text-gray-700 hover:text-[#D1447D] transition-colors">FAQ</a>
              <a href="#" className="text-gray-700 hover:text-[#D1447D] transition-colors">Blog</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#D1447D]" />
              <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#D1447D]" />
              <Droplets className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#D1447D]" />
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#D1447D]" />
                <span className="absolute -top-2 -right-2 bg-[#D1447D] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#A8D0E6] to-[#F3C4EB] rounded-3xl p-8 shadow-2xl">
                <div className="bg-[#D1447D] text-white p-8 rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🍉</div>
                    <div className="text-xl font-bold">Bluu</div>
                    <div className="text-sm">Hidratação Melancia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
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
                <p className="text-gray-600 mb-6">
                  Transforme qualquer 500 ml de água em uma explosão refrescante de melancia. 
                  Sem açúcar, zero corantes artificiais e apenas 5 kcal por porção.
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
                        title={flavor.available ? '' : 'Disponível em breve :)'}
                      >
                        {flavor.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Button className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white py-3 text-lg font-semibold">
                  ADICIONAR AO CARRINHO
                </Button>
                <a href="#" className="block text-center text-[#D1447D] hover:underline">
                  Assinar & economizar 15%
                </a>
              </div>

              {/* Shipping Calculator */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-[#A8D0E6] hover:bg-[#97C5E3] text-gray-800">
                  CALCULAR
                </Button>
              </div>
            </div>
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

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher Bluu Melancia?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Droplets, title: 'Hidratação inteligente', desc: 'Água + sabor + nutrientes essenciais' },
              { icon: CheckCircle, title: 'Zero açúcar', desc: 'Adoçado com sucralose natural' },
              { icon: Zap, title: 'Praticidade absoluta', desc: 'Misture em qualquer lugar, a qualquer hora' },
              { icon: Sun, title: 'Só 5 kcal', desc: 'Sabor sem culpa, hidratação sem peso' }
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
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-8xl text-center mb-4">🍉</div>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 h-4 bg-[#A8D0E6] rounded-full"></div>
                  <div className="w-4 h-4 bg-[#D1447D] rounded-full"></div>
                  <div className="w-4 h-4 bg-[#F3C4EB] rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Refrescância que cabe no bolso
              </h2>
              <p className="text-xl text-gray-600">
                Sabor de melancia geladinha, zero açúcar e só 5 kcal. Perfeito para o verão.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🧊', text: 'Gelo de verdade' },
                  { icon: '⚡', text: 'Pick-me-up instantâneo' },
                  { icon: '🌞', text: 'Mood de verão' },
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
      <section className="py-16 bg-[#F3C4EB]/10">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            A hidratação saborizada que conquistou mais de 60.000 clientes
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Bluu é citado em +1.000 reviews 5★ como "o empurrãozinho perfeito para beber água".
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Paula', context: 'praia', emoji: '🏖️' },
              { name: 'Gabriel', context: 'escritório', emoji: '💼' },
              { name: 'Juliana', context: 'academia', emoji: '🏋️‍♀️' }
            ].map((person, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{person.emoji}</div>
                  <p className="text-gray-600 mb-4">
                    "Bluu mudou minha relação com a água. Agora consigo beber os 2L recomendados sem esforço!"
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900 mt-2">{person.name}</p>
                </CardContent>
              </Card>
            ))}
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
                      <span className="font-semibold">5 kcal</span>
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-16 bg-[#D1447D]">
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
    </div>
  );
};

export default Index;
