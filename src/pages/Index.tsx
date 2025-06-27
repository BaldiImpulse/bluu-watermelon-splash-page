import React, { useState } from 'react';
import { Dialog } from '@radix-ui/react-dialog';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Checkout from '@/components/Checkout';

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Spray Facial de Água Termal', price: 39.90, quantity: 1 },
  ]);
  const shipping = 10.00;
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + shipping;

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-100 to-pink-100 py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            Descubra o Segredo de uma Pele Radiante
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Hidratação e frescor em cada borrifada.
          </p>
          <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white">
            Compre Agora
          </Button>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/lovable-uploads/e7543e4c-1b44-45ba-b3a5-989e99144944.png"
                alt="Spray Facial"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Spray Facial de Água Termal
              </h2>
              <p className="text-gray-600 mb-8">
                Enriquecido com minerais essenciais, nosso spray facial proporciona
                hidratação profunda e revitalização instantânea para todos os tipos de
                pele.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-8">
                <li>Hidratação intensa e duradoura</li>
                <li>Acalma e refresca a pele</li>
                <li>Protege contra agressões externas</li>
                <li>Ideal para uso diário</li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-gray-800">R$ 39,90</span>
                <Button onClick={openCheckout} className="bg-[#D1447D] hover:bg-[#B13A6B] text-white">
                  <ShoppingBag className="mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Refrescância que cabe no bolso */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Refrescância que cabe no bolso
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Nosso Spray Facial de Água Termal é o companheiro ideal para quem busca
                praticidade e cuidado com a pele. Perfeito para todos os momentos.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Hidratação instantânea</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Fácil de transportar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">100% natural</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/lovable-uploads/991f1e9c-a9bd-44c6-8a2d-55d906b74e95.png"
                alt="Mulher usando spray facial ao ar livre"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            O que dizem sobre nós
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic mb-4">
                "Este spray facial é incrível! Minha pele nunca esteve tão hidratada e
                radiante."
              </p>
              <p className="text-gray-800 font-semibold">- Maria Silva</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic mb-4">
                "Adoro como este spray facial refresca minha pele durante o dia. É perfeito
                para levar na bolsa!"
              </p>
              <p className="text-gray-800 font-semibold">- João Oliveira</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic mb-4">
                "Produto maravilhoso! Sinto minha pele muito mais saudável e protegida desde
                que comecei a usar."
              </p>
              <p className="text-gray-800 font-semibold">- Ana Souza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8 text-white text-center">
        <p>&copy; 2024 Lovable Skincare. Todos os direitos reservados.</p>
      </footer>

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        cartItems={cartItems}
        total={total}
        shipping={shipping}
      />
    </div>
  );
};

export default Index;
