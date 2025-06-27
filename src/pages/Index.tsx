import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Checkout from "@/components/Checkout";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ice Tea Limão",
    description: "Refrescante e revigorante, perfeito para os dias quentes.",
    price: 4.5,
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<{ id: number; quantity: number }[]>(
    []
  );
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (productId: number) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === productId);

    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateShipping = () => {
    const total = calculateTotal();
    return total < 30 ? 5 : 0;
  };

  const total = calculateTotal() + calculateShipping();

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-pink-50 to-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra o Novo Ice Tea Limão
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Refrescância e sabor em cada gole. Experimente a combinação perfeita
            de chá e limão.
          </p>
          <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-6 rounded-full">
            Compre Agora
          </Button>
        </div>
      </div>

      {/* Product section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">
                  R$ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => addToCart(product.id)}
                  className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-2 px-4 rounded-full"
                >
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Affordability section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Refrescância que cabe no bolso
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sabor premium, preço justo - perfeito para todos os momentos
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#D1447D] hover:bg-[#B13A6B] text-white font-bold py-3 px-6 rounded-full">
              Confira as Ofertas
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Qual o prazo de entrega?</AccordionTrigger>
              <AccordionContent>
                O prazo de entrega varia de acordo com a sua região. Você pode
                consultar o prazo exato no momento da compra.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quais as formas de pagamento?</AccordionTrigger>
              <AccordionContent>
                Aceitamos cartões de crédito, boleto bancário e PIX.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Como funciona a política de troca e devolução?
              </AccordionTrigger>
              <AccordionContent>
                Você pode solicitar a troca ou devolução do produto em até 7 dias
                após o recebimento.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Cart drawer */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-4 right-4 bg-[#D1447D] hover:bg-[#B13A6B] text-white rounded-full shadow-lg p-4">
            <ShoppingCart className="w-6 h-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Seu Carrinho</DrawerTitle>
            <DrawerDescription>
              Confira os produtos selecionados e finalize sua compra.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {cartItems.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-4"
                    >
                      <div>
                        <p className="font-semibold">{product?.name}</p>
                        <p className="text-gray-600">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-800">
                        R$ {(product?.price || 0 * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  );
                })}
                <Separator className="my-4" />
                <div className="font-bold text-lg">
                  Total: R$ {calculateTotal().toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Frete: R$ {calculateShipping().toFixed(2)}
                </div>
                <div className="font-bold text-lg mt-2">
                  Total com Frete: R$ {total.toFixed(2)}
                </div>
              </>
            )}
          </div>
          <DrawerFooter>
            <Button
              onClick={handleOpenCheckout}
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white"
              disabled={cartItems.length === 0}
            >
              Finalizar Compra
            </Button>
            <Checkout
              isOpen={isCheckoutOpen}
              onClose={handleCloseCheckout}
              cartItems={cartItems.map((item) => {
                const product = products.find((p) => p.id === item.id);
                return {
                  id: item.id,
                  name: product?.name || "Unknown",
                  price: product?.price || 0,
                  quantity: item.quantity,
                };
              })}
              total={total}
              shipping={calculateShipping()}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Index;
