
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Mail } from 'lucide-react';

const Obrigado = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendRestockEmailToWebhook = async (email: string) => {
    try {
      const response = await fetch('https://webhook.beimpulse-flow.com/webhook/4dafdc74-be85-4737-8743-2b031e6f62a8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          email: email,
          source: 'restock-notification',
          timestamp: new Date().toISOString(),
          page: 'obrigado-page'
        }),
      });
      
      console.log('Email de reestoque enviado para webhook:', { email, source: 'restock-notification' });
    } catch (error) {
      console.error('Erro ao enviar email de reestoque para webhook:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await sendRestockEmailToWebhook(email);
      setIsSubmitted(true);
      // Aqui você pode adicionar a lógica para salvar o email
      console.log('Email para notificação:', email);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Obrigado pelo seu interesse!
          </h1>
          <p className="text-gray-600 mb-4">
            Infelizmente nosso produto <strong>esgotou</strong> 😔
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 leading-relaxed">
            Nossa marca está em lançamento e fomos surpreendidos com a quantidade de vendas em tão pouco tempo! 
            Estamos trabalhando para reabastecer nosso estoque no menor tempo possível.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quer ser avisado quando voltarmos ao estoque?
              </label>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <Button 
              type="submit"
              className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white"
            >
              Me avise quando voltar!
            </Button>
          </form>
        ) : (
          <div className="bg-green-50 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">
              Perfeito! Te avisaremos assim que tivermos novidades 🎉
            </p>
            <p className="text-sm text-green-600 mt-1">
              Fique de olho no seu e-mail!
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Obrigado;
