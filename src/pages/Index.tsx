import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Checkout from "@/components/Checkout";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const cartItems = [
    { id: 1, name: "Essencial Exclusivo", price: 89.90, quantity: 1 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = total > 100 ? 0 : 10;

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FFE4E6] to-[#FFF0F5] py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Descubra a Elegância em Cada Borrifada
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Encontre o perfume perfeito para cada momento da sua vida.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-6">
                Comprar Agora
              </Button>
            </DialogTrigger>
            <Checkout
              isOpen={isCheckoutOpen}
              onClose={closeCheckout}
              cartItems={cartItems}
              total={total}
              shipping={shipping}
            />
          </Dialog>
        </div>
      </section>

      {/* Featured Perfumes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nossos Perfumes Mais Amados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Perfume Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://fraguru.net/mdimg/perfume/375x500.32734.jpg"
                alt="Perfume Essencial"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Essencial Exclusivo
                </h3>
                <p className="text-gray-600 mb-4">
                  Uma fragrância sofisticada para momentos especiais.
                </p>
                <span className="font-bold text-gray-800">R$ 89,90</span>
              </div>
            </div>

            {/* Perfume Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://m.media-amazon.com/images/I/61LOoANJ+2L._AC_UF1000,1000_QL80_.jpg"
                alt="Perfume Elegance"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Elegance Noir
                </h3>
                <p className="text-gray-600 mb-4">
                  A combinação perfeita de notas florais e amadeiradas.
                </p>
                <span className="font-bold text-gray-800">R$ 79,90</span>
              </div>
            </div>

            {/* Perfume Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://static.belezanaweb.com.br/products/150808/product/homem_dom_masculino_deo_parfum_100ml_natura_1666184644.jpg"
                alt="Perfume Adventure"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Adventure Sport
                </h3>
                <p className="text-gray-600 mb-4">
                  Para o homem moderno que busca novas aventuras.
                </p>
                <span className="font-bold text-gray-800">R$ 99,90</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affordability Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFE4E6] to-[#FFF0F5]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Refrescância que cabe no bolso
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nosso perfume de bolso é compacto, prático e perfeito para todos os momentos.
            Leve-o sempre com você e mantenha-se sempre perfumado!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Preço Acessível</h3>
              <p className="text-gray-600">Qualidade premium por um preço justo</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">👜</div>
              <h3 className="text-xl font-semibold mb-2">Tamanho Ideal</h3>
              <p className="text-gray-600">Cabe perfeitamente na sua bolsa ou bolso</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">Sempre Pronto</h3>
              <p className="text-gray-600">Para usar quando e onde quiser</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Experimente a Diferença Hoje Mesmo
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Descubra a fragrância que vai te acompanhar em todos os momentos.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-6">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Adquira Já o Seu
              </Button>
            </DialogTrigger>
            <Checkout
              isOpen={isCheckoutOpen}
              onClose={closeCheckout}
              cartItems={cartItems}
              total={total}
              shipping={shipping}
            />
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 Sua Loja de Perfumes. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
