
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Mail } from 'lucide-react';

interface OutOfStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OutOfStockModal: React.FC<OutOfStockModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      // Aqui você pode implementar a lógica para salvar o email
      console.log('Email cadastrado:', email);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#D1447D]">
            Produto Esgotado!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center py-4">
          <div className="text-6xl mb-4">😔</div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Ops! Ficamos sem estoque</h3>
            <p className="text-gray-600 text-sm">
              A Bluu está em lançamento e fomos surpreendidos com a quantidade de vendas em tão pouco tempo! 
            </p>
            <p className="text-gray-600 text-sm">
              Estamos trabalhando para reabastecer nosso estoque no menor tempo possível.
            </p>
          </div>

          {!isSubmitted ? (
            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Quer saber quando voltarmos?
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  Deixe seu email e te avisaremos assim que o produto estiver disponível!
                </p>
              </div>
              
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center"
                />
                <Button 
                  onClick={handleEmailSubmit}
                  className="w-full bg-[#D1447D] hover:bg-[#B13A6B] text-white"
                  disabled={!email}
                >
                  Quero ser avisado!
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-600 text-2xl mb-2">✅</div>
                <h3 className="font-semibold text-green-800">Email cadastrado!</h3>
                <p className="text-sm text-green-700">
                  Te avisaremos assim que o Bluu estiver disponível novamente!
                </p>
              </div>
              <Button 
                onClick={handleClose}
                variant="outline"
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockModal;
