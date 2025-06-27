
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

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
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            Produto Esgotado
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center p-4">
          <div className="text-6xl mb-4">😔</div>
          
          {!isSubmitted ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800">
                Ops! Produto Esgotado
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                Nossa marca está em lançamento e fomos surpreendidos com a quantidade de vendas em tão pouco tempo! 
                Estamos trabalhando para reabastecer nosso estoque no menor tempo possível.
              </p>
              
              <div className="space-y-3 mt-6">
                <p className="font-medium text-gray-800">
                  Quer ser avisado quando o produto voltar?
                </p>
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
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-4xl">✅</div>
              <h3 className="text-xl font-semibold text-green-600">
                E-mail cadastrado com sucesso!
              </h3>
              <p className="text-gray-600">
                Te avisaremos assim que o produto estiver disponível novamente.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockModal;
