
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Package } from 'lucide-react';

interface OutOfStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OutOfStockModal: React.FC<OutOfStockModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setEmailSubmitted(true);
      console.log('Email cadastrado:', email);
      setTimeout(() => {
        onClose();
        setEmail('');
        setEmailSubmitted(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Package className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            Produto Esgotado
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
              Ops! Produto temporariamente indisponível
            </p>
            <p className="text-sm text-gray-600">
              Nossa marca está em lançamento e fomos surpreendidos com a quantidade de vendas em tão pouco tempo! 
              Estamos trabalhando para reabastecer nosso estoque no menor tempo possível.
            </p>
          </div>

          {!emailSubmitted ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Quer ser avisado quando voltarmos?
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleEmailSubmit}
                  className="bg-[#D1447D] hover:bg-[#B13A6B]"
                  disabled={!email.trim()}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 font-medium">
                ✅ E-mail cadastrado com sucesso!
              </p>
              <p className="text-sm text-green-700">
                Te avisaremos assim que o produto voltar!
              </p>
            </div>
          )}

          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutOfStockModal;
