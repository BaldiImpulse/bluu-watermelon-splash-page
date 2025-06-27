
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Obrigado = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE4E6] to-[#FFF0F5] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Produto Esgotado!</h1>
          <p className="text-gray-600 leading-relaxed">
            Nossa marca está em lançamento e fomos surpreendidos com a quantidade de vendas em tão pouco tempo! 
            Estamos trabalhando para reabastecer nosso estoque no menor tempo possível.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deixe seu email para ser avisado quando o produto voltar:
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-[#D1447D] hover:bg-[#B13A6B]">
              <Mail className="w-4 h-4 mr-2" />
              Quero ser avisado
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-green-600 font-medium">
              ✅ Email cadastrado com sucesso!
            </div>
            <p className="text-sm text-gray-600">
              Você será o primeiro a saber quando o produto voltar ao estoque.
            </p>
          </div>
        )}

        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mt-6 w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à página inicial
        </Button>
      </div>
    </div>
  );
};

export default Obrigado;
