import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Package, ShoppingBag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#D1447D] to-[#682CA0] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra a Revolução da Refrescância com Bluu
          </h1>
          <p className="text-lg md:text-xl mb-8">
            A bebida que vai transformar seus momentos, unindo sabor, saúde e praticidade em
            uma experiência única.
          </p>
          <Button size="lg" className="bg-white text-[#D1447D] hover:bg-gray-100 font-bold" onClick={() => navigate("/produto")}>
            Experimente Agora
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Flavor & Health */}
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#D1447D]" />
              <h3 className="text-xl font-semibold mb-2">Sabor e Saúde em Harmonia</h3>
              <p className="text-gray-600">
                Ingredientes naturais, zero açúcar e um sabor irresistível que você vai amar.
              </p>
            </div>

            {/* Practicality */}
            <div className="text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-[#D1447D]" />
              <h3 className="text-xl font-semibold mb-2">Praticidade para o Seu Dia</h3>
              <p className="text-gray-600">
                Leve e prepare em segundos, onde quer que você esteja. A solução perfeita para
                uma vida agitada.
              </p>
            </div>

            {/* Unique Experience */}
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-[#D1447D]" />
              <h3 className="text-xl font-semibold mb-2">Uma Experiência Única</h3>
              <p className="text-gray-600">
                Descubra novos sabores e sensações. Bluu é mais que uma bebida, é um estilo de
                vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Prepare Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Preparo Simples, Sabor Incrível
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <img
                src="https://i.imgur.com/9qeryRr.png"
                alt="Passo 1"
                className="mx-auto mb-4 rounded-full shadow-md w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">Passo 1</h3>
              <p className="text-gray-600">Adicione água gelada em um copo ou garrafa.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <img
                src="https://i.imgur.com/08gRxQH.png"
                alt="Passo 2"
                className="mx-auto mb-4 rounded-full shadow-md w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">Passo 2</h3>
              <p className="text-gray-600">Despeje o conteúdo de um sachê de Bluu.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <img
                src="https://i.imgur.com/iGPs9qw.png"
                alt="Passo 3"
                className="mx-auto mb-4 rounded-full shadow-md w-32 h-32 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">Passo 3</h3>
              <p className="text-gray-600">Misture bem e aproveite a explosão de sabor!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Affordability Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Refrescância que cabe no bolso
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Com apenas <span className="font-bold text-[#D1447D]">R$ 4,99 por porção</span>,
              você tem uma bebida premium, saudável e deliciosa.
              <span className="font-semibold"> Perfeito para todos os momentos</span> e
              muito mais econômico que outras opções do mercado.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="font-bold text-lg mb-2">Economia Real</h3>
                <p className="text-gray-600">Menos de R$ 5 por porção vs. R$ 8-12 de bebidas similares</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-4">🏠</div>
                <h3 className="font-bold text-lg mb-2">Conveniência</h3>
                <p className="text-gray-600">Prepare em casa, leve para onde quiser</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="font-bold text-lg mb-2">Qualidade Premium</h3>
                <p className="text-gray-600">Ingredientes selecionados, sabor excepcional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            O Que Nossos Clientes Estão Dizendo
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 italic mb-4">
                "Bluu mudou minha rotina! Agora tenho uma bebida deliciosa e saudável sempre à
                mão. Recomendo a todos!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.imgur.com/4EOraTD.jpeg"
                  alt="Cliente 1"
                  className="rounded-full w-12 h-12 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">Mariana Oliveira</p>
                  <p className="text-gray-500">Estudante</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 italic mb-4">
                "Como atleta, preciso de opções rápidas e nutritivas. Bluu superou minhas
                expectativas. Saboroso e revigorante!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://i.imgur.com/KxYj85y.jpeg"
                  alt="Cliente 2"
                  className="rounded-full w-12 h-12 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">Carlos Silva</p>
                  <p className="text-gray-500">Atleta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#682CA0] to-[#D1447D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Transformar Sua Refrescância?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Experimente Bluu e descubra um mundo de sabor, saúde e praticidade.
          </p>
          <Button size="lg" className="bg-white text-[#D1447D] hover:bg-gray-100 font-bold" onClick={() => navigate("/produto")}>
            Compre Agora
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-sm">
          © 2024 Bluu. Todos os direitos reservados.
        </p>
      </footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Produto Esgotado</DialogTitle>
            <DialogDescription>
              Gostaria de ser avisado quando o produto estiver disponível?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          {submitted ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 h-4 w-4" />
              <p className="text-sm text-gray-500">
                Obrigado! Entraremos em contato assim que o produto estiver disponível.
              </p>
            </div>
          ) : (
            <Button onClick={handleSubmit}>Enviar</Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
